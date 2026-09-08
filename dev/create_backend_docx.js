const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType } = require('docx');

// Content from the analysis
const content = `
IndCasting Backend Structure – Perfect Version for Frontend Integration

Tech Stack Overview
- **NestJS**: Framework for building the API
- **TypeScript**: Language for type‑safe code
- **PostgreSQL**: Relational database for all data
- **TypeORM**: ORM layer connecting TypeScript to PostgreSQL
- **Passport + JWT**: Authentication with access/refresh tokens
- **bcrypt**: Password hashing (never stores plaintext)
- **class-validator**: DTO validation
- **Redis**: Fast temporary storage for sessions, rate‑limit, BullMQ
- **BullMQ**: Background job queue (emails, notifications)
- **Socket.IO**: Real‑time messaging
- **Cloudinary**: Media storage (images, videos) with automatic transforms
- **multer**: Multipart file upload handling
- **Resend**: Transactional email sending
- **web-push**: Browser push notifications
- **helmet**: Security headers
- **@nestjs/throttler**: Rate limiting
- **compression**: Gzip responses
- **pino**: Structured logging
- **Jest + supertest**: Automated testing

Folder Structure
indcasting-api/
├── src/
│   ├── main.ts                 # Bootstrap Nest app, global pipes/filters, CORS, API prefix /api/v2
│   ├── app.module.ts           # Root module – imports all feature modules + ConfigModule + ThrottlerModule
│   ├── config/
│   │   ├── configuration.ts    # Returns typed config object from .env
│   │   └── validation.schema.ts# Joi/Zod schema validated on startup
│   │
│   ├── database/
│   │   ├── database.module.ts  # TypeORM connection (uses config)
│   │   └── migrations/
│   │       └── *.ts            # Timestamped migration files
│   │
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts  # POST /auth/register, /auth/login, /auth/refresh, /auth/logout
│   │   ├── auth.service.ts     # bcrypt hash, JWT sign/verify, refresh token hash storage
│   │   ├── strategies/jwt.strategy.ts
│   │   ├── dto/login.dto.ts
│   │   └── dto/register.dto.ts
│   │
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts # GET/PATCH/DELETE /users/me (guarded)
│   │   ├── users.service.ts
│   │   ├── entities/user.entity.ts
│   │   └── dto/update-user.dto.ts
│   │
│   ├── talent-profiles/
│   │   ├── talent-profiles.module.ts
│   │   ├── talent-profiles.controller.ts # GET /talent (paginated), GET /talent/:id, PATCH /talent/me
│   │   ├── talent-profiles.service.ts
│   │   ├── entities/talent-profile.entity.ts
│   │   └── dto/search-talent.dto.ts
│   │
│   ├── casting-calls/
│   │   ├── casting-calls.module.ts
│   │   ├── casting-calls.controller.ts # POST /casting-calls (seeker only, guarded + throttled), GET /casting-calls (paginated, filterable), GET /casting-calls/:id, PATCH/DELETE (owner only)
│   │   ├── casting-calls.service.ts
│   │   ├── entities/casting-call.entity.ts
│   │   └── dto/create-casting-call.dto.ts
│   │
│   ├── applications/
│   │   ├── applications.module.ts
│   │   ├── applications.controller.ts # POST /casting-calls/:id/applications (talent only), GET /applications/mine, PATCH /applications/:id/status (seeker only)
│   │   ├── applications.service.ts
│   │   ├── entities/application.entity.ts
│   │   └── dto/create-application.dto.ts
│   │
│   ├── messaging/
│   │   ├── messaging.module.ts
│   │   ├── messaging.gateway.ts        # Socket.IO gateway (JWT auth + Redis adapter)
│   │   ├── messaging.service.ts
│   │   ├── entities/message.entity.ts
│   │   └── adapters/redis-io.adapter.ts
│   │
│   ├── notifications/
│   │   ├── notifications.module.ts
│   │   ├── notifications.service.ts    # Central notify(userId, type, payload) → WS + BullMQ email queue
│   │   ├── notifications.processor.ts  # BullMQ worker (runs in worker/ process)
│   │   └── entities/notification.entity.ts
│   │
│   ├── media/
│   │   ├── media.module.ts
│   │   ├── media.controller.ts         # POST /media/upload (multipart, size/type limited, returns URL)
│   │   ├── media.service.ts            # Cloudinary SDK wrapper
│   │   └── entities/media-asset.entity.ts
│   │
│   ├── reviews/
│   │   ├── reviews.module.ts
│   │   ├── reviews.controller.ts       # POST /applications/:id/review (after completed), GET /talent/:id/reviews
│   │   ├── reviews.service.ts
│   │   └── entities/review.entity.ts
│   │
│   └── worker/
│       ├── worker/main.ts              # Nest app context for workers only (no HTTP server)
│       └── processors/
│           ├── email.processor.ts      # Sends queued emails via Resend
│           └── video-transcode.processor.ts
│
├── test/
│   └── *.e2e-spec.ts
│
├── .env
├── .env.example
├── nest-cli.json
├── tsconfig.json
�└── package.json

Key Improvements over Original Structure
1. API Versioning – All routes prefixed with /api/v2 (set in main.ts via app.setGlobalPrefix('api/v2')), enabling future version‑safe changes.
2. Global Auth Guard – @UseGuards(JwtAuthGuard) applied globally in app.module.ts; every route requires a valid JWT unless explicitly marked @Public().
3. Rate Limiting on Auth – @UseGuards(ThrottlerGuard) on /auth/register and /auth/login (configurable via ThrottlerModule) to prevent brute‑force.
4. Centralized Error Handling – Added AllExceptionsFilter that catches thrown errors and unhandled promise rejections, returning a consistent JSON shape {statusCode, message, error, timestamp}.
5. Input Validation – Uses ValidationPipe (global) plus class‑validator on every DTO; service layer also validates incoming data where appropriate.
6. Pagination – List endpoints (GET /talent, GET /casting-calls, GET /applications/mine) accept page and limit query params; service uses TypeORM pagination or skip/take.
7. Health Check – GET /health returns detailed status: {status: 'ok', services: {database: 'connected', redis: 'connected'}}.
8. CORS Configuration – Strict origin list from config (e.g., frontend URL) with credentials enabled for HttpOnly cookies.
9. Environment Validation – On startup, ConfigModule.forRoot({ isGlobal: true, validationSchema: ValidationSchema }) throws if required vars missing.
10. Transactional Services – Complex multi‑table operations (e.g., creating an application) are wrapped in a TypeORM transaction via @Transactional() decorator or entityManager.transaction.
11. API Documentation – Swagger module (@nestjs/swagger) enabled in main.ts; generates OpenAPI JSON at /api/docs and UI at /api/docs (protected in prod via guard).
12. Modular Workers – BullMQ processors live in a separate Nest application (worker/) that shares entities but runs without an HTTP server, improving scalability.
13. Security Headers – helmet configured with contentSecurityPolicy, referrerPolicy, permissionsPolicy, etc.
14. File Upload Limits – multer configured with fileFilter (mime types) and limits (fileSize: 5 MB) before handing off to Cloudinary.
15. Role‑Based Decorators – Custom @Roles() decorator reads from JWT payload; guards compare against route metadata.

Conclusion
This structure provides a secure, scalable, and maintainable backend that aligns perfectly with the IndCasting frontend’s expectations (authenticated API calls, real‑time messaging, media uploads, paginated lists, role‑based access). Implementing the improvements above will close the critical gaps identified in the security audit (plaintext passwords, missing auth guards, no rate limiting, etc.) while delivering a solid foundation for future features.
`;

// Split content into lines and create paragraphs
const lines = content.trim().split('\n');
const paragraphs = [];

for (const line of lines) {
  if (line.trim() === '') {
    // Empty line - add a blank paragraph
    paragraphs.push(new Paragraph());
    continue;
  }

  // Detect headings based on markdown-like syntax
  let headingLevel = null;
  let text = line;
  if (line.startsWith('## ')) {
    headingLevel = HeadingLevel.HEADING_2;
    text = line.substring(3);
  } else if (line.startsWith('### ')) {
    headingLevel = HeadingLevel.HEADING_3;
    text = line.substring(4);
  } else if (line.startsWith('#### ')) {
    headingLevel = HeadingLevel.HEADING_4;
    text = line.substring(5);
  } else if (line.startsWith('- **')) {
    // Bold item in list - treat as regular paragraph with bold text
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({ text: '- ', bold: false }),
          new TextRun({ text: line.substring(2, line.indexOf('**') + 2), bold: true }),
          new TextRun({ text: line.substring(line.indexOf('**') + 2), bold: false }),
        ],
      })
    );
    continue;
  } else if (line.startsWith('├── ') || line.startsWith('│   ') || line.startsWith('�└── ') || line.startsWith('    ')) {
    // Tree structure - use monospace font
    paragraphs.push(
      new Paragraph({
        children: [new TextRun({ text: line, font: 'Courier New' })],
      })
    );
    continue;
  }

  if (headingLevel) {
    paragraphs.push(new Paragraph({ text, heading: headingLevel }));
  } else {
    paragraphs.push(new Paragraph({ text }));
  }
}

// Create the document
const doc = new Document({
  sections: [
    {
      properties: {},
      children: paragraphs,
    },
  ],
});

// Pack and save
Packer.toBuffer(doc).then((buffer) => {
  const fs = require('fs');
  fs.writeFileSync('c:/Users/karth/Desktop/Mr R/Ind casting/test/Indcasting-website/dev/IndCasting-Backend.docx', buffer);
  console.log('Document created successfully');
});