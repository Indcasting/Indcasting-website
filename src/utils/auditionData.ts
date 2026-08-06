export interface Audition {
  id: string;
  title: string;          // Role Applied For / Job Role
  company: string;        // Company / Recruiter Name
  candidateName?: string; // Seeker View Only
  candidatePic?: string;  // Seeker View Only
  date: string;           // YYYY-MM-DD
  startTime: string;      // HH:MM AM/PM
  endTime: string;        // HH:MM AM/PM
  type: 'In-Person' | 'Online';
  location: string;       // Venue or Meeting Link
  status: 'Pending' | 'Scheduled' | 'Completed' | 'Cancelled';
  talentId: string;       // User ID of the talent
  seekerId: string;       // User ID of the seeker
}

const STORAGE_KEY = 'indcasting_auditions';

const getInitialData = (): Audition[] => {
  const today = new Date();
  
  // Format: YYYY-MM-DD
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const addDays = (date: Date, days: number) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  };

  return [
    {
      id: 'aud_1',
      title: 'Commercial Lead',
      company: 'Silver Screen Ads',
      candidateName: 'Abhiroop Singh',
      candidatePic: '',
      date: formatDate(today),
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      type: 'In-Person',
      location: 'Mumbai Studio 4',
      status: 'Pending',
      talentId: 'talent_1',
      seekerId: 'seeker_1'
    },
    {
      id: 'aud_2',
      title: 'Fashion Shoot',
      company: 'Vogue India',
      candidateName: 'Abhiroop Singh',
      candidatePic: '',
      date: formatDate(addDays(today, 2)),
      startTime: '02:30 PM',
      endTime: '06:00 PM',
      type: 'In-Person',
      location: 'Bandra West',
      status: 'Scheduled',
      talentId: 'talent_1',
      seekerId: 'seeker_2'
    },
    {
      id: 'aud_3',
      title: 'Voice Actor',
      company: 'AudioVerse',
      candidateName: 'Abhiroop Singh',
      candidatePic: '',
      date: formatDate(addDays(today, 3)),
      startTime: '11:00 AM',
      endTime: '01:00 PM',
      type: 'Online',
      location: 'https://zoom.us/j/123456789',
      status: 'Scheduled',
      talentId: 'talent_1',
      seekerId: 'seeker_3'
    },
    {
      id: 'aud_4',
      title: 'Supporting Role',
      company: 'Star Studios',
      candidateName: 'Priya Sharma',
      candidatePic: '',
      date: formatDate(today),
      startTime: '04:00 PM',
      endTime: '05:00 PM',
      type: 'Online',
      location: 'https://meet.google.com/abc-defg-hij',
      status: 'Pending',
      talentId: 'talent_2',
      seekerId: 'seeker_1' // For Seeker dashboard
    },
    {
      id: 'aud_5',
      title: 'Extra',
      company: 'Epic Films',
      candidateName: 'Rahul Verma',
      candidatePic: '',
      date: formatDate(addDays(today, -2)),
      startTime: '09:00 AM',
      endTime: '10:00 AM',
      type: 'In-Person',
      location: 'Film City Set C',
      status: 'Completed',
      talentId: 'talent_3',
      seekerId: 'seeker_1' // For Seeker dashboard
    }
  ];
};

export const getAllAuditions = (): Audition[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  const initial = getInitialData();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
};

export const getAuditionsForUser = (userId: string, role: 'talent' | 'seeker'): Audition[] => {
  const all = getAllAuditions();
  return all.filter(a => role === 'talent' ? a.talentId === userId : a.seekerId === userId);
};

export const updateAuditionStatus = (id: string, newStatus: Audition['status']) => {
  const all = getAllAuditions();
  const updated = all.map(a => a.id === id ? { ...a, status: newStatus } : a);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  
  // Dispatch custom event to trigger re-renders
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auditionsUpdated'));
  }
};

export const rescheduleAudition = (id: string, newDate: string, newStartTime: string, newEndTime: string) => {
  const all = getAllAuditions();
  const updated = all.map(a => a.id === id ? { ...a, date: newDate, startTime: newStartTime, endTime: newEndTime, status: 'Scheduled' } : a);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auditionsUpdated'));
  }
};
