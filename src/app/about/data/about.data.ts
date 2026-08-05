import { AboutPageData } from '../types';

export const aboutData: AboutPageData = {
  hero: {
    kicker: 'ABOUT ODYX',
    title: 'Built to Transform Digital Dentistry.',
    subtitle: 'At ODYX, we combine advanced technology, deep expertise, and a passion for innovation to create an ecosystem that empowers clinicians and elevates patient care.',
    primaryCta: { label: 'Our Story', href: '#journey' },
    features: [
      {
        icon: 'shield-check',
        title: 'Our Mission',
        description: 'Empower clinicians with innovative solutions.',
      },
      {
        icon: 'users',
        title: 'Our Focus',
        description: 'Simplify workflows and improve outcomes.',
      },
      {
        icon: 'lightbulb',
        title: 'Our Innovation',
        description: 'Pioneering technology that shapes the future of dentistry.',
      },
      {
        icon: 'globe',
        title: 'Our Impact',
        description: 'Trusted by clinicians in 60+ countries worldwide.',
      },
    ],
  },
  why: {
    kicker: 'WHY ODYX',
    title: 'More than technology, a partner you can rely on.',
    subtitle: 'We stand by clinicians with reliable solutions, real support, and a commitment to help them grow—today and for the future.',
    features: [
      {
        icon: 'settings',
        title: 'Engineered to Perform',
        description: 'Precision. Reliability. Proven results.',
      },
      {
        icon: 'user',
        title: 'People Who Care',
        description: 'Real support from real experts.',
      },
      {
        icon: 'book',
        title: 'Knowledge That Empowers',
        description: 'Education and resources to keep you ahead.',
      },
      {
        icon: 'heart',
        title: 'Growing Together',
        description: 'Your success is our mission.',
      },
    ],
    cards: [
      {
        image: '/images/about/clinicians.png',
        title: 'For Clinicians',
        description: 'Solutions that simplify your daily workflow.',
      },
      {
        image: '/images/about/educators.png',
        title: 'For Educators',
        description: 'Tools and training that inspire confidence.',
      },
      {
        image: '/images/about/partners.png',
        title: 'For Partners',
        description: 'We grow with partners who share our vision.',
      },
    ],
  },
  journey: {
    kicker: 'OUR JOURNEY',
    title: 'Innovation Driven by Purpose.',
    description: 'From a bold idea to a global ecosystem, our journey is built on continuous innovation and a mission to make digital dentistry better for everyone.',
    cta: { label: 'Our Milestones', href: '#milestones' },
    milestones: [
      {
        year: '2019',
        title: 'The Beginning',
        description: 'ODYX was founded with a clear mission to empower dentists through technology.',
        image: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=200&auto=format&fit=crop',
      },
      {
        year: '2021',
        title: 'First Solution',
        description: 'We launched our first intraoral scanner—engineered for accuracy and ease of use.',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=200&auto=format&fit=crop',
      },
      {
        year: '2023',
        title: 'Expanding Ecosystem',
        description: 'We introduced printers, materials, and digital solutions that work seamlessly together.',
        image: 'https://images.unsplash.com/photo-1610926950566-a81d09e51c6b?q=80&w=200&auto=format&fit=crop',
      },
      {
        year: '2025',
        title: 'Global Impact',
        description: 'Trusted by thousands of clinicians in 60+ countries worldwide.',
        image: 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?q=80&w=200&auto=format&fit=crop',
      },
      {
        year: 'Future',
        title: 'Endless Possibilities',
        description: 'We continue to innovate and build the future of digital dentistry.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=200&auto=format&fit=crop',
      },
    ],
  },
  values: {
    kicker: 'OUR VALUES',
    title: 'What Drives Us.',
    values: [
      {
        icon: 'shield',
        title: 'Integrity',
        description: 'We do the right thing—for our customers, partners, and patients.',
      },
      {
        icon: 'bulb',
        title: 'Innovation',
        description: 'We challenge the status quo to deliver breakthrough solutions.',
      },
      {
        icon: 'cap',
        title: 'Education',
        description: 'We empower clinicians through knowledge, training, and support.',
      },
      {
        icon: 'handshake',
        title: 'Partnership',
        description: 'We grow together with our customers and communities.',
      },
    ],
  },
  team: {
    kicker: 'OUR TEAM',
    title: 'Built by Experts. Inspired by Impact.',
    description: 'Our diverse team of clinicians, engineers, designers, and researchers are united by one mission: advancing dental care through technology.',
    cta: { label: 'Meet the Team', href: '/team' },
    members: [
      {
        name: 'Team Member 1',
        role: 'Co-Founder & CEO',
        image: '/images/about/our_team.png',
        linkedin: '#',
      },
      {
        name: 'Team Member 2',
        role: 'Head of Clinical Affairs',
        image: '/images/about/our_team.png',
        linkedin: '#',
      },
      {
        name: 'Team Member 3',
        role: 'CTO',
        image: '/images/about/our_team.png',
        linkedin: '#',
      },
      {
        name: 'Team Member 4',
        role: 'Head of Design',
        image: '/images/about/our_team.png',
        linkedin: '#',
      },
      {
        name: 'Team Member 5',
        role: 'Lead Developer',
        image: '/images/about/our_team.png',
        linkedin: '#',
      },
    ],
  },
  news: {
    kicker: 'NEWS & INSIGHTS',
    title: 'Stay Inspired. Stay Ahead.',
    description: 'The latest news, product launches, research, and insights from ODYX.',
    cta: { label: 'View All News', href: '/news' },
    news: [
      {
        date: 'May 20, 2025',
        title: 'ODYX Launches Next-Gen Intraoral Scanner',
        description: 'Faster. Smarter. More Accurate.',
        image: '/images/about/next_gen.png',
        category: 'FEATURED',
        href: '#',
      },
      {
        date: 'Apr 28, 2025',
        title: 'ODYX at IDS 2025: Thank You!',
        description: 'It was an incredible event.',
        image: '/images/about/ids_2025.png',
        href: '#',
      },
      {
        date: 'Apr 10, 2025',
        title: 'AI-Powered Design: The Future is Now',
        description: 'How AI is transforming workflows.',
        image: '/images/about/ai_powered.png',
        href: '#',
      },
    ],
  },
  stats: {
    title: 'Together, we\'re shaping the future of dentistry.',
    stats: [
      { value: '10K+', label: 'Clinicians' },
      { value: '1M+', label: 'Smiles Enhanced' },
      { value: '60+', label: 'Countries Served' },
    ],
    cta: { label: 'Request a Demo', href: '/support' },
  },
};
