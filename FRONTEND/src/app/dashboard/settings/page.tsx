"use client";

import { useState } from "react";
import {
  UserRound,
  ShieldCheck,
  Bell,
  Lock,
  Palette,
  BriefcaseBusiness,
  Eye,
  Mail,
  Smartphone,
  MapPin,
  Save,
  Check,
  Moon,
  Sun,
  Monitor,
  LogOut,
  Trash2,
  ChevronRight,
  KeyRound,
  Globe2,
  CircleHelp,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type SettingsSection =
  | "profile"
  | "account"
  | "notifications"
  | "privacy"
  | "appearance"
  | "applications";

/* =========================================================
   STYLES
========================================================= */

const STYLES = `
  * {
    box-sizing: border-box;
  }

  .settings-page {
    min-height: calc(100vh - 80px);
    background: var(--cream);
    color: var(--ink);
    padding: 34px 40px 80px;
    font-family:
      Inter,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;

    --ink: #111111;
    --cream: #fffdf7;
    --white: #ffffff;
    --mist: #e9e4d9;
    --mid: #706b65;
    --gold: #c9a84c;
    --gold-light: #e8c96a;
    --danger: #c0392b;
  }

  html.dark .settings-page {
    --ink: #f4f4f4;
    --cream: #0b0b0b;
    --white: #141414;
    --mist: #292929;
    --mid: #a8a8a8;
    --gold: #c9a84c;
    --gold-light: #e8c96a;
  }

  /* =====================================================
     CONTAINER
  ===================================================== */

  .settings-container {
    width: min(1120px, 100%);
    margin: 0 auto;
  }

  /* =====================================================
     HEADER
  ===================================================== */

  .settings-header {
    margin-bottom: 32px;
  }

  .settings-eyebrow {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--gold);
    font-size: .68rem;
    font-weight: 800;
    letter-spacing: .14em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .settings-title {
    margin: 0;
    font-family: "Instrument Serif", Georgia, serif;
    font-size: clamp(2.3rem, 4vw, 3.3rem);
    line-height: 1;
    font-weight: 400;
    letter-spacing: -.02em;
  }

  .settings-description {
    max-width: 620px;
    margin: 10px 0 0;
    color: var(--mid);
    font-size: .88rem;
    line-height: 1.65;
  }

  /* =====================================================
     LAYOUT
  ===================================================== */

  .settings-layout {
    display: grid;
    grid-template-columns: 225px minmax(0, 1fr);
    gap: 28px;
    align-items: start;
  }

  /* =====================================================
     NAVIGATION
  ===================================================== */

  .settings-nav {
    position: sticky;
    top: 24px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .settings-nav-label {
    margin: 0 0 8px 10px;
    color: var(--mid);
    font-size: .63rem;
    font-weight: 800;
    letter-spacing: .11em;
    text-transform: uppercase;
  }

  .settings-nav-button {
    position: relative;
    width: 100%;
    min-height: 44px;
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 0 12px;
    border: 1px solid transparent;
    border-radius: 10px;
    background: transparent;
    color: var(--mid);
    font-family: inherit;
    font-size: .75rem;
    font-weight: 650;
    text-align: left;
    cursor: pointer;
    transition: .2s ease;
  }

  .settings-nav-button:hover {
    background: rgba(201,168,76,.055);
    color: var(--ink);
  }

  .settings-nav-button.active {
    background: var(--white);
    border-color: var(--mist);
    color: var(--ink);
  }

  html.dark .settings-nav-button.active {
    background: #151515;
    border-color: #292929;
  }

  .settings-nav-button.active::before {
    content: "";
    position: absolute;
    left: -1px;
    top: 9px;
    bottom: 9px;
    width: 3px;
    border-radius: 0 4px 4px 0;
    background: var(--gold);
  }

  .settings-nav-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  .settings-nav-chevron {
    margin-left: auto;
    opacity: .45;
  }

  /* =====================================================
     CONTENT
  ===================================================== */

  .settings-content {
    min-width: 0;
  }

  .settings-section {
    display: none;
  }

  .settings-section.active {
    display: block;
    animation: settingsFade .22s ease;
  }

  @keyframes settingsFade {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* =====================================================
     SECTION HEADER
  ===================================================== */

  .section-heading {
    margin-bottom: 20px;
  }

  .section-heading h2 {
    margin: 0;
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 2rem;
    line-height: 1;
    font-weight: 400;
  }

  .section-heading p {
    margin: 7px 0 0;
    color: var(--mid);
    font-size: .76rem;
    line-height: 1.6;
  }

  /* =====================================================
     CARD
  ===================================================== */

  .settings-card {
    margin-bottom: 18px;
    border: 1px solid var(--mist);
    border-radius: 16px;
    overflow: hidden;
    background: var(--white);
  }

  html.dark .settings-card {
    background: #111111;
    border-color: #292929;
  }

  .settings-card-header {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 18px 20px;
    border-bottom: 1px solid var(--mist);
  }

  html.dark .settings-card-header {
    border-color: #292929;
  }

  .settings-card-icon {
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(201,168,76,.25);
    border-radius: 9px;
    color: var(--gold);
    background: rgba(201,168,76,.055);
    flex-shrink: 0;
  }

  .settings-card-header h3 {
    margin: 0;
    color: var(--ink);
    font-size: .83rem;
    font-weight: 750;
  }

  .settings-card-header p {
    margin: 3px 0 0;
    color: var(--mid);
    font-size: .67rem;
  }

  .settings-card-body {
    padding: 22px 20px;
  }

  /* =====================================================
     FORM
  ===================================================== */

  .settings-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }

  .settings-field {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .settings-field.full {
    grid-column: 1 / -1;
  }

  .settings-label {
    color: var(--ink);
    font-size: .7rem;
    font-weight: 700;
  }

  .settings-input,
  .settings-select {
    width: 100%;
    height: 43px;
    padding: 0 13px;
    border: 1px solid var(--mist);
    border-radius: 9px;
    outline: none;
    background: var(--cream);
    color: var(--ink);
    font-family: inherit;
    font-size: .76rem;
    transition: .2s ease;
  }

  html.dark .settings-input,
  html.dark .settings-select {
    background: #171717;
    border-color: #303030;
    color: #f2f2f2;
  }

  .settings-input:focus,
  .settings-select:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(201,168,76,.08);
  }

  .settings-input::placeholder {
    color: var(--mid);
  }

  .field-with-icon {
    position: relative;
  }

  .field-with-icon .settings-input {
    padding-left: 40px;
  }

  .field-icon {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--mid);
    pointer-events: none;
  }

  .field-note {
    color: var(--mid);
    font-size: .62rem;
    line-height: 1.45;
  }

  /* =====================================================
     TOGGLE
  ===================================================== */

  .setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    min-height: 66px;
    padding: 13px 0;
    border-bottom: 1px solid rgba(201,168,76,.07);
  }

  .setting-row:first-child {
    padding-top: 0;
  }

  .setting-row:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  .setting-row-info {
    min-width: 0;
  }

  .setting-row-title {
    margin: 0;
    color: var(--ink);
    font-size: .76rem;
    font-weight: 700;
  }

  .setting-row-description {
    margin: 4px 0 0;
    max-width: 600px;
    color: var(--mid);
    font-size: .66rem;
    line-height: 1.5;
  }

  .toggle {
  position: relative;
  width: 43px;
  height: 24px;
  flex-shrink: 0;
  border: none;
  border-radius: 999px;
  background: #3a3a3a;
  cursor: pointer;
  transition: background 0.2s ease;
}

.toggle.active {
  background: #c9a84c;
}

.toggle-knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.toggle.active .toggle-knob {
  transform: translateX(19px);
}

  /* =====================================================
     APPEARANCE
  ===================================================== */

  .appearance-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .appearance-option {
    min-height: 100px;
    padding: 15px;
    border: 1px solid var(--mist);
    border-radius: 11px;
    background: transparent;
    color: var(--mid);
    cursor: pointer;
    text-align: left;
    transition: .2s ease;
  }

  .appearance-option:hover {
    border-color: rgba(201,168,76,.55);
  }

  .appearance-option.active {
    border-color: var(--gold);
    background: rgba(201,168,76,.055);
    color: var(--ink);
  }

  .appearance-option-icon {
    margin-bottom: 15px;
    color: var(--gold);
  }

  .appearance-option-title {
    display: block;
    color: var(--ink);
    font-size: .74rem;
    font-weight: 750;
  }

  .appearance-option-description {
    display: block;
    margin-top: 4px;
    color: var(--mid);
    font-size: .61rem;
  }

  /* =====================================================
     SECURITY
  ===================================================== */

  .security-item {
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 14px 0;
    border-bottom: 1px solid rgba(201,168,76,.07);
  }

  .security-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .security-item:first-child {
    padding-top: 0;
  }

  .security-item-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9px;
    background: var(--cream);
    color: var(--mid);
    border: 1px solid var(--mist);
    flex-shrink: 0;
  }

  html.dark .security-item-icon {
    background: #181818;
    border-color: #303030;
  }

  .security-item-content {
    flex: 1;
    min-width: 0;
  }

  .security-item-title {
    margin: 0;
    color: var(--ink);
    font-size: .75rem;
    font-weight: 700;
  }

  .security-item-description {
    margin: 3px 0 0;
    color: var(--mid);
    font-size: .64rem;
  }

  .security-action {
    height: 35px;
    padding: 0 13px;
    border: 1px solid var(--mist);
    border-radius: 8px;
    background: transparent;
    color: var(--ink);
    font-family: inherit;
    font-size: .65rem;
    font-weight: 700;
    cursor: pointer;
    transition: .2s ease;
  }

  .security-action:hover {
    border-color: var(--gold);
    color: var(--gold);
  }

  /* =====================================================
     CATEGORY CHIPS
  ===================================================== */

  .category-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .category-option {
    padding: 8px 14px;
    border: 1px solid var(--mist);
    border-radius: 8px;
    background: transparent;
    color: var(--mid);
    font-family: inherit;
    font-size: .68rem;
    font-weight: 650;
    cursor: pointer;
    transition: .2s ease;
  }

  .category-option:hover {
    border-color: rgba(201,168,76,.5);
  }

  .category-option.active {
    border-color: var(--gold);
    background: rgba(201,168,76,.08);
    color: var(--gold);
  }

  /* =====================================================
     SAVE BAR
  ===================================================== */

  .settings-save-bar {
    position: sticky;
    bottom: 18px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    margin-top: 22px;
    padding: 12px 14px 12px 18px;
    border: 1px solid var(--mist);
    border-radius: 12px;
    background: color-mix(
      in srgb,
      var(--white) 92%,
      transparent
    );
    backdrop-filter: blur(12px);
  }

  .save-message {
    display: flex;
    align-items: center;
    gap: 7px;
    color: var(--mid);
    font-size: .66rem;
  }

  .save-message.success {
    color: #398c43;
  }

  .save-button {
    height: 38px;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 0 16px;
    border: none;
    border-radius: 8px;
    background: var(--ink);
    color: var(--cream);
    font-family: inherit;
    font-size: .68rem;
    font-weight: 750;
    cursor: pointer;
    transition: .2s ease;
  }

  .save-button:hover {
    opacity: .88;
    transform: translateY(-1px);
  }

  html.dark .save-button {
    background: #f2f2f2;
    color: #111;
  }

  /* =====================================================
     DANGER ZONE
  ===================================================== */

  .danger-card {
    margin-top: 28px;
    border: 1px solid rgba(192,57,43,.28);
    border-radius: 16px;
    overflow: hidden;
    background: rgba(192,57,43,.025);
  }

  .danger-header {
    padding: 17px 20px;
    border-bottom: 1px solid rgba(192,57,43,.16);
  }

  .danger-header h3 {
    margin: 0;
    color: var(--danger);
    font-size: .8rem;
    font-weight: 750;
  }

  .danger-header p {
    margin: 4px 0 0;
    color: var(--mid);
    font-size: .64rem;
  }

  .danger-body {
    padding: 17px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  .danger-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .danger-button {
    height: 36px;
    padding: 0 13px;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    border: 1px solid rgba(192,57,43,.3);
    border-radius: 8px;
    background: transparent;
    color: var(--danger);
    font-family: inherit;
    font-size: .65rem;
    font-weight: 700;
    cursor: pointer;
    transition: .2s ease;
  }

  .danger-button:hover {
    background: rgba(192,57,43,.07);
    border-color: var(--danger);
  }

  /* =====================================================
     HELP
  ===================================================== */

  .settings-help {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 18px;
    padding: 14px 16px;
    border: 1px solid var(--mist);
    border-radius: 11px;
    color: var(--mid);
    font-size: .65rem;
  }

  .settings-help svg {
    color: var(--gold);
    flex-shrink: 0;
  }

  .settings-help a {
    color: var(--gold);
    text-decoration: none;
    font-weight: 700;
  }

  /* =====================================================
     RESPONSIVE
  ===================================================== */

  @media (max-width: 850px) {
    .settings-page {
      padding: 28px 20px 60px;
    }

    .settings-layout {
      grid-template-columns: 1fr;
      gap: 22px;
    }

    .settings-nav {
      position: static;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    .settings-nav-label {
      grid-column: 1 / -1;
      margin-top: 0;
    }

    .settings-nav-button.active::before {
      left: 0;
      top: 8px;
      bottom: 8px;
    }
  }

  @media (max-width: 600px) {
    .settings-page {
      padding: 22px 14px 50px;
    }

    .settings-title {
      font-size: 2.35rem;
    }

    .settings-nav {
      grid-template-columns: 1fr 1fr;
    }

    .settings-form-grid {
      grid-template-columns: 1fr;
    }

    .settings-field.full {
      grid-column: auto;
    }

    .appearance-options {
      grid-template-columns: 1fr;
    }

    .appearance-option {
      min-height: 76px;
    }

    .appearance-option-icon {
      margin-bottom: 8px;
    }

    .danger-body {
      align-items: flex-start;
      flex-direction: column;
    }

    .settings-save-bar {
      bottom: 10px;
    }
  }

  @media (max-width: 420px) {
    .settings-nav {
      grid-template-columns: 1fr;
    }

    .settings-card-body {
      padding: 18px 15px;
    }

    .settings-card-header {
      padding: 16px 15px;
    }

    .setting-row {
      gap: 12px;
    }
  }
`;

/* =========================================================
   TOGGLE COMPONENT
========================================================= */

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      className={`toggle ${enabled ? "active" : ""}`}
      onClick={onChange}
      aria-pressed={enabled}
    >
      <span className="toggle-knob" />
    </button>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("profile");

  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Riya",
    lastName: "Sharma",
    email: "riya.sharma@example.com",
    phone: "+91 98765 43210",
    city: "Mumbai",
    role: "Actor",
  });

  const [settings, setSettings] = useState({
    emailApplications: true,
    emailMessages: true,
    emailCasting: true,
    pushApplications: true,
    pushMessages: true,
    pushCasting: false,
    profileVisible: true,
    showContact: false,
    allowMessages: true,
    showActivity: true,
    twoFactor: false,
  });

  const [appearance, setAppearance] = useState<
    "light" | "dark" | "system"
  >("system");

  const [categories, setCategories] = useState<string[]>([
    "Actor",
    "Model",
    "Dancer",
  ]);

  const navItems: {
    id: SettingsSection;
    label: string;
    icon: React.ElementType;
  }[] = [
    {
      id: "profile",
      label: "Profile",
      icon: UserRound,
    },
    {
      id: "account",
      label: "Account & Security",
      icon: ShieldCheck,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "privacy",
      label: "Privacy",
      icon: Lock,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: Palette,
    },
    {
      id: "applications",
      label: "Application Preferences",
      icon: BriefcaseBusiness,
    },
  ];

  const toggleSetting = (
    key: keyof typeof settings
  ) => {
    setSettings((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));

    setSaved(false);
  };

  const updateProfile = (
    key: keyof typeof profile,
    value: string
  ) => {
    setProfile((previous) => ({
      ...previous,
      [key]: value,
    }));

    setSaved(false);
  };

  const toggleCategory = (category: string) => {
    setCategories((previous) =>
      previous.includes(category)
        ? previous.filter((item) => item !== category)
        : [...previous, category]
    );

    setSaved(false);
  };

  const saveChanges = () => {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <>
      <style>{STYLES}</style>

      <main className="settings-page">
        <div className="settings-container">

          {/* =================================================
              HEADER
          ================================================= */}

          <header className="settings-header">
            <div className="settings-eyebrow">
              <SettingsIcon />
              Account Settings
            </div>

            <h1 className="settings-title">
              Settings
            </h1>

            <p className="settings-description">
              Manage your profile, account preferences,
              notifications, privacy and casting preferences
              from one place.
            </p>
          </header>

          {/* =================================================
              MAIN LAYOUT
          ================================================= */}

          <div className="settings-layout">

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="settings-nav">

              <p className="settings-nav-label">
                Preferences
              </p>

              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    className={`settings-nav-button ${
                      activeSection === item.id
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setActiveSection(item.id)
                    }
                  >
                    <Icon className="settings-nav-icon" />

                    <span>{item.label}</span>

                    {activeSection === item.id && (
                      <ChevronRight
                        size={14}
                        className="settings-nav-chevron"
                      />
                    )}
                  </button>
                );
              })}
            </aside>

            {/* =================================================
                CONTENT
            ================================================= */}

            <section className="settings-content">

              {/* =================================================
                  PROFILE
              ================================================= */}

              <div
                className={`settings-section ${
                  activeSection === "profile"
                    ? "active"
                    : ""
                }`}
              >
                <div className="section-heading">
                  <h2>Profile</h2>
                  <p>
                    Update the information visible on your
                    account.
                  </p>
                </div>

                <div className="settings-card">

                  <div className="settings-card-header">
                    <div className="settings-card-icon">
                      <UserRound size={17} />
                    </div>

                    <div>
                      <h3>Personal information</h3>
                      <p>
                        Keep your basic profile information
                        up to date.
                      </p>
                    </div>
                  </div>

                  <div className="settings-card-body">

                    <div className="settings-form-grid">

                      <div className="settings-field">
                        <label className="settings-label">
                          First name
                        </label>

                        <input
                          className="settings-input"
                          value={profile.firstName}
                          onChange={(e) =>
                            updateProfile(
                              "firstName",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="settings-field">
                        <label className="settings-label">
                          Last name
                        </label>

                        <input
                          className="settings-input"
                          value={profile.lastName}
                          onChange={(e) =>
                            updateProfile(
                              "lastName",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="settings-field">
                        <label className="settings-label">
                          Email address
                        </label>

                        <div className="field-with-icon">
                          <Mail
                            size={15}
                            className="field-icon"
                          />

                          <input
                            className="settings-input"
                            type="email"
                            value={profile.email}
                            onChange={(e) =>
                              updateProfile(
                                "email",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="settings-field">
                        <label className="settings-label">
                          Phone number
                        </label>

                        <div className="field-with-icon">
                          <Smartphone
                            size={15}
                            className="field-icon"
                          />

                          <input
                            className="settings-input"
                            value={profile.phone}
                            onChange={(e) =>
                              updateProfile(
                                "phone",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="settings-field">
                        <label className="settings-label">
                          City
                        </label>

                        <div className="field-with-icon">
                          <MapPin
                            size={15}
                            className="field-icon"
                          />

                          <input
                            className="settings-input"
                            value={profile.city}
                            onChange={(e) =>
                              updateProfile(
                                "city",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="settings-field">
                        <label className="settings-label">
                          Primary role
                        </label>

                        <select
                          className="settings-select"
                          value={profile.role}
                          onChange={(e) =>
                            updateProfile(
                              "role",
                              e.target.value
                            )
                          }
                        >
                          <option>Actor</option>
                          <option>Model</option>
                          <option>Dancer</option>
                          <option>Voice Artist</option>
                          <option>Child Artist</option>
                          <option>Influencer</option>
                        </select>
                      </div>

                    </div>

                  </div>
                </div>

                <div className="settings-card">

                  <div className="settings-card-header">
                    <div className="settings-card-icon">
                      <Globe2 size={17} />
                    </div>

                    <div>
                      <h3>Profile visibility</h3>
                      <p>
                        Control how casting professionals
                        discover your profile.
                      </p>
                    </div>
                  </div>

                  <div className="settings-card-body">

                    <div className="setting-row">

                      <div className="setting-row-info">
                        <h4 className="setting-row-title">
                          Make profile discoverable
                        </h4>

                        <p className="setting-row-description">
                          Allow casting directors and production
                          teams to discover your profile through
                          searches and recommendations.
                        </p>
                      </div>

                      <Toggle
                        enabled={settings.profileVisible}
                        onChange={() =>
                          toggleSetting(
                            "profileVisible"
                          )
                        }
                      />

                    </div>

                  </div>
                </div>
              </div>

              {/* =================================================
                  ACCOUNT
              ================================================= */}

              <div
                className={`settings-section ${
                  activeSection === "account"
                    ? "active"
                    : ""
                }`}
              >
                <div className="section-heading">
                  <h2>Account & Security</h2>
                  <p>
                    Keep your account secure and manage
                    authentication options.
                  </p>
                </div>

                <div className="settings-card">

                  <div className="settings-card-header">
                    <div className="settings-card-icon">
                      <KeyRound size={17} />
                    </div>

                    <div>
                      <h3>Login & security</h3>
                      <p>
                        Manage your password and account
                        protection.
                      </p>
                    </div>
                  </div>

                  <div className="settings-card-body">

                    <div className="security-item">

                      <div className="security-item-icon">
                        <Lock size={16} />
                      </div>

                      <div className="security-item-content">
                        <h4 className="security-item-title">
                          Password
                        </h4>

                        <p className="security-item-description">
                          Last changed more than 30 days ago.
                        </p>
                      </div>

                      <button className="security-action">
                        Change password
                      </button>

                    </div>

                    <div className="security-item">

                      <div className="security-item-icon">
                        <ShieldCheck size={16} />
                      </div>

                      <div className="security-item-content">
                        <h4 className="security-item-title">
                          Two-factor authentication
                        </h4>

                        <p className="security-item-description">
                          Add another layer of protection to
                          your account.
                        </p>
                      </div>

                      <Toggle
                        enabled={settings.twoFactor}
                        onChange={() =>
                          toggleSetting("twoFactor")
                        }
                      />

                    </div>

                  </div>
                </div>

                <div className="settings-card">

                  <div className="settings-card-header">
                    <div className="settings-card-icon">
                      <Smartphone size={17} />
                    </div>

                    <div>
                      <h3>Active sessions</h3>
                      <p>
                        Manage devices currently signed into
                        your account.
                      </p>
                    </div>
                  </div>

                  <div className="settings-card-body">

                    <div className="security-item">

                      <div className="security-item-icon">
                        <Monitor size={16} />
                      </div>

                      <div className="security-item-content">
                        <h4 className="security-item-title">
                          Current browser
                        </h4>

                        <p className="security-item-description">
                          Mac · Chrome · Active now
                        </p>
                      </div>

                      <span
                        style={{
                          color: "#398c43",
                          fontSize: ".63rem",
                          fontWeight: 700,
                        }}
                      >
                        Current
                      </span>

                    </div>

                  </div>
                </div>
              </div>

              {/* =================================================
                  NOTIFICATIONS
              ================================================= */}

              <div
                className={`settings-section ${
                  activeSection === "notifications"
                    ? "active"
                    : ""
                }`}
              >
                <div className="section-heading">
                  <h2>Notifications</h2>
                  <p>
                    Choose what updates you want to receive.
                  </p>
                </div>

                <div className="settings-card">

                  <div className="settings-card-header">
                    <div className="settings-card-icon">
                      <Mail size={17} />
                    </div>

                    <div>
                      <h3>Email notifications</h3>
                      <p>
                        Updates sent to your registered email.
                      </p>
                    </div>
                  </div>

                  <div className="settings-card-body">

                    <div className="setting-row">
                      <div className="setting-row-info">
                        <h4 className="setting-row-title">
                          Application updates
                        </h4>
                        <p className="setting-row-description">
                          Get notified when your applications
                          are viewed, shortlisted or rejected.
                        </p>
                      </div>

                      <Toggle
                        enabled={
                          settings.emailApplications
                        }
                        onChange={() =>
                          toggleSetting(
                            "emailApplications"
                          )
                        }
                      />
                    </div>

                    <div className="setting-row">
                      <div className="setting-row-info">
                        <h4 className="setting-row-title">
                          Messages
                        </h4>
                        <p className="setting-row-description">
                          Receive email notifications for new
                          messages.
                        </p>
                      </div>

                      <Toggle
                        enabled={settings.emailMessages}
                        onChange={() =>
                          toggleSetting(
                            "emailMessages"
                          )
                        }
                      />
                    </div>

                    <div className="setting-row">
                      <div className="setting-row-info">
                        <h4 className="setting-row-title">
                          Casting opportunities
                        </h4>
                        <p className="setting-row-description">
                          Receive relevant new opportunities
                          matching your profile.
                        </p>
                      </div>

                      <Toggle
                        enabled={settings.emailCasting}
                        onChange={() =>
                          toggleSetting(
                            "emailCasting"
                          )
                        }
                      />
                    </div>

                  </div>
                </div>

                <div className="settings-card">

                  <div className="settings-card-header">
                    <div className="settings-card-icon">
                      <Smartphone size={17} />
                    </div>

                    <div>
                      <h3>Push notifications</h3>
                      <p>
                        Notifications delivered directly to
                        your device.
                      </p>
                    </div>
                  </div>

                  <div className="settings-card-body">

                    <div className="setting-row">
                      <div className="setting-row-info">
                        <h4 className="setting-row-title">
                          Application updates
                        </h4>
                        <p className="setting-row-description">
                          Get instant updates about your
                          applications.
                        </p>
                      </div>

                      <Toggle
                        enabled={
                          settings.pushApplications
                        }
                        onChange={() =>
                          toggleSetting(
                            "pushApplications"
                          )
                        }
                      />
                    </div>

                    <div className="setting-row">
                      <div className="setting-row-info">
                        <h4 className="setting-row-title">
                          Messages
                        </h4>
                        <p className="setting-row-description">
                          Get notified when someone sends you
                          a message.
                        </p>
                      </div>

                      <Toggle
                        enabled={settings.pushMessages}
                        onChange={() =>
                          toggleSetting(
                            "pushMessages"
                          )
                        }
                      />
                    </div>

                    <div className="setting-row">
                      <div className="setting-row-info">
                        <h4 className="setting-row-title">
                          Casting opportunities
                        </h4>
                        <p className="setting-row-description">
                          Get alerts for new matching casting
                          calls.
                        </p>
                      </div>

                      <Toggle
                        enabled={settings.pushCasting}
                        onChange={() =>
                          toggleSetting(
                            "pushCasting"
                          )
                        }
                      />
                    </div>

                  </div>
                </div>
              </div>

              {/* =================================================
                  PRIVACY
              ================================================= */}

              <div
                className={`settings-section ${
                  activeSection === "privacy"
                    ? "active"
                    : ""
                }`}
              >
                <div className="section-heading">
                  <h2>Privacy</h2>
                  <p>
                    Decide what information other users can
                    see and how they can interact with you.
                  </p>
                </div>

                <div className="settings-card">

                  <div className="settings-card-header">
                    <div className="settings-card-icon">
                      <Eye size={17} />
                    </div>

                    <div>
                      <h3>Profile privacy</h3>
                      <p>
                        Control visibility of your talent
                        profile.
                      </p>
                    </div>
                  </div>

                  <div className="settings-card-body">

                    <div className="setting-row">
                      <div className="setting-row-info">
                        <h4 className="setting-row-title">
                          Public profile
                        </h4>
                        <p className="setting-row-description">
                          Allow anyone on IndCasting to view
                          your public profile.
                        </p>
                      </div>

                      <Toggle
                        enabled={
                          settings.profileVisible
                        }
                        onChange={() =>
                          toggleSetting(
                            "profileVisible"
                          )
                        }
                      />
                    </div>

                    <div className="setting-row">
                      <div className="setting-row-info">
                        <h4 className="setting-row-title">
                          Show contact information
                        </h4>
                        <p className="setting-row-description">
                          Display your contact details to
                          verified casting professionals.
                        </p>
                      </div>

                      <Toggle
                        enabled={settings.showContact}
                        onChange={() =>
                          toggleSetting(
                            "showContact"
                          )
                        }
                      />
                    </div>

                    <div className="setting-row">
                      <div className="setting-row-info">
                        <h4 className="setting-row-title">
                          Allow direct messages
                        </h4>
                        <p className="setting-row-description">
                          Allow casting professionals to
                          contact you directly.
                        </p>
                      </div>

                      <Toggle
                        enabled={
                          settings.allowMessages
                        }
                        onChange={() =>
                          toggleSetting(
                            "allowMessages"
                          )
                        }
                      />
                    </div>

                    <div className="setting-row">
                      <div className="setting-row-info">
                        <h4 className="setting-row-title">
                          Show recent activity
                        </h4>
                        <p className="setting-row-description">
                          Let profile visitors see recent
                          activity related to your work.
                        </p>
                      </div>

                      <Toggle
                        enabled={settings.showActivity}
                        onChange={() =>
                          toggleSetting(
                            "showActivity"
                          )
                        }
                      />
                    </div>

                  </div>
                </div>
              </div>

              {/* =================================================
                  APPEARANCE
              ================================================= */}

              <div
                className={`settings-section ${
                  activeSection === "appearance"
                    ? "active"
                    : ""
                }`}
              >
                <div className="section-heading">
                  <h2>Appearance</h2>
                  <p>
                    Choose how IndCasting should look on your
                    device.
                  </p>
                </div>

                <div className="settings-card">

                  <div className="settings-card-header">
                    <div className="settings-card-icon">
                      <Palette size={17} />
                    </div>

                    <div>
                      <h3>Theme</h3>
                      <p>
                        Select your preferred appearance.
                      </p>
                    </div>
                  </div>

                  <div className="settings-card-body">

                    <div className="appearance-options">

                      <button
                        className={`appearance-option ${
                          appearance === "light"
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          setAppearance("light")
                        }
                      >
                        <Sun
                          size={18}
                          className="appearance-option-icon"
                        />

                        <span className="appearance-option-title">
                          Light
                        </span>

                        <span className="appearance-option-description">
                          Bright and clean
                        </span>
                      </button>

                      <button
                        className={`appearance-option ${
                          appearance === "dark"
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          setAppearance("dark")
                        }
                      >
                        <Moon
                          size={18}
                          className="appearance-option-icon"
                        />

                        <span className="appearance-option-title">
                          Dark
                        </span>

                        <span className="appearance-option-description">
                          Easy on the eyes
                        </span>
                      </button>

                      <button
                        className={`appearance-option ${
                          appearance === "system"
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          setAppearance("system")
                        }
                      >
                        <Monitor
                          size={18}
                          className="appearance-option-icon"
                        />

                        <span className="appearance-option-title">
                          System
                        </span>

                        <span className="appearance-option-description">
                          Follow device setting
                        </span>
                      </button>

                    </div>

                  </div>
                </div>
              </div>

              {/* =================================================
                  APPLICATION PREFERENCES
              ================================================= */}

              <div
                className={`settings-section ${
                  activeSection === "applications"
                    ? "active"
                    : ""
                }`}
              >
                <div className="section-heading">
                  <h2>Application Preferences</h2>
                  <p>
                    Tell IndCasting what kinds of opportunities
                    you're interested in.
                  </p>
                </div>

                <div className="settings-card">

                  <div className="settings-card-header">
                    <div className="settings-card-icon">
                      <BriefcaseBusiness size={17} />
                    </div>

                    <div>
                      <h3>Interested in</h3>
                      <p>
                        Select the categories you want to see.
                      </p>
                    </div>
                  </div>

                  <div className="settings-card-body">

                    <div className="category-grid">

                      {[
                        "Actor",
                        "Model",
                        "Dancer",
                        "Voice Artist",
                        "Child Artist",
                        "Influencer",
                        "Theatre",
                        "Music Video",
                        "Advertisement",
                      ].map((category) => (
                        <button
                          key={category}
                          className={`category-option ${
                            categories.includes(category)
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            toggleCategory(category)
                          }
                        >
                          {category}
                        </button>
                      ))}

                    </div>

                  </div>
                </div>

                <div className="settings-card">

                  <div className="settings-card-header">
                    <div className="settings-card-icon">
                      <MapPin size={17} />
                    </div>

                    <div>
                      <h3>Opportunity location</h3>
                      <p>
                        Set your preferred working location.
                      </p>
                    </div>
                  </div>

                  <div className="settings-card-body">

                    <div className="settings-form-grid">

                      <div className="settings-field">
                        <label className="settings-label">
                          Preferred city
                        </label>

                        <select
                          className="settings-select"
                          defaultValue="Mumbai"
                        >
                          <option>Mumbai</option>
                          <option>Delhi</option>
                          <option>Bengaluru</option>
                          <option>Hyderabad</option>
                          <option>Kolkata</option>
                          <option>Chennai</option>
                          <option>Pune</option>
                          <option>Any location</option>
                        </select>
                      </div>

                      <div className="settings-field">
                        <label className="settings-label">
                          Work preference
                        </label>

                        <select
                          className="settings-select"
                          defaultValue="On-site"
                        >
                          <option>On-site</option>
                          <option>Remote</option>
                          <option>Hybrid</option>
                          <option>Any</option>
                        </select>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

              {/* =================================================
                  SAVE BAR
              ================================================= */}

              <div className="settings-save-bar">

                <div
                  className={`save-message ${
                    saved ? "success" : ""
                  }`}
                >
                  {saved ? (
                    <>
                      <Check size={14} />
                      Changes saved successfully
                    </>
                  ) : (
                    "Changes are saved only when you select Save changes."
                  )}
                </div>

                <button
                  className="save-button"
                  onClick={saveChanges}
                >
                  <Save size={14} />
                  Save changes
                </button>

              </div>

              {/* =================================================
                  DANGER ZONE
              ================================================= */}

              <div className="danger-card">

                <div className="danger-header">
                  <h3>Danger zone</h3>
                  <p>
                    These actions can affect your account
                    permanently.
                  </p>
                </div>

                <div className="danger-body">

                  <div>
                    <strong
                      style={{
                        display: "block",
                        color: "var(--ink)",
                        fontSize: ".72rem",
                        marginBottom: "4px",
                      }}
                    >
                      Account actions
                    </strong>

                    <span
                      style={{
                        color: "var(--mid)",
                        fontSize: ".64rem",
                      }}
                    >
                      Sign out of your account or permanently
                      remove it.
                    </span>
                  </div>

                  <div className="danger-actions">

                    <button className="danger-button">
                      <LogOut size={14} />
                      Log out
                    </button>

                    <button className="danger-button">
                      <Trash2 size={14} />
                      Delete account
                    </button>

                  </div>

                </div>
              </div>

              {/* =================================================
                  HELP
              ================================================= */}

              <div className="settings-help">
                <CircleHelp size={16} />

                <span>
                  Need help with your account?{" "}
                  <a href="/dashboard/help">
                    Visit Help Center
                  </a>
                </span>
              </div>

            </section>
          </div>
        </div>
      </main>
    </>
  );
}

/* =========================================================
   SMALL ICON COMPONENT
========================================================= */

function SettingsIcon() {
  return <SettingsGlyph size={14} />;
}

function SettingsGlyph({
  size = 16,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.42 1.42-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20h-2v-.08a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.42-1.42.06-.06A1.7 1.7 0 0 0 9.4 15a1.7 1.7 0 0 0-1.56-1.03H7.76v-2h.08A1.7 1.7 0 0 0 9.4 11a1.7 1.7 0 0 0-.34-1.88L9 9.06l1.42-1.42.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 13.4 6.5V6h2v.08a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.42 1.42-.06.06A1.7 1.7 0 0 0 19.4 11a1.7 1.7 0 0 0 1.56 1.03H21v2h-.08A1.7 1.7 0 0 0 19.4 15Z" />
    </svg>
  );
}