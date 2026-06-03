// API client for fetching data from backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function fetchHeroData() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/hero`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) throw new Error('Failed to fetch hero data');
    return await res.json();
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return null;
  }
}

export async function fetchAboutData() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/about`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) throw new Error('Failed to fetch about data');
    return await res.json();
  } catch (error) {
    console.error('Error fetching about data:', error);
    return null;
  }
}

export async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/projects`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) throw new Error('Failed to fetch projects');
    return await res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function fetchSkills(category?: string) {
  try {
    const url = category 
      ? `${API_BASE_URL}/api/skills?category=${category}`
      : `${API_BASE_URL}/api/skills`;
      
    const res = await fetch(url, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) throw new Error('Failed to fetch skills');
    return await res.json();
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

export async function fetchExperiences() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/experiences`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) throw new Error('Failed to fetch experiences');
    return await res.json();
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
}
