// app/(protected)/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext'; // Prawidłowa ścieżka!
import { User, Edit3, Save, X } from 'lucide-react';

// Definiujemy strukturę danych profilu
interface ProfileData {
  name: string;
  email: string;
  profilePicture: string | null;
}

export default function ProfilePage() {
  const { authState } = useAuth();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Test User',
    email: 'test@example.com',
    profilePicture: null,
  });

  // Efekt do wczytywania danych z localStorage przy pierwszym załadowaniu
  useEffect(() => {
    const savedData = localStorage.getItem('userProfile');
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }
  }, []);

  // Zabezpieczenie trasy
  useEffect(() => {
    if (authState === 'unauthenticated') {
      router.push('/');
    }
  }, [authState, router]);

  // Funkcja do obsługi zmiany zdjęcia
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Funkcja do zapisywania zmian
  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    setIsEditing(false);
  };
  
  // Ekran ładowania
  if (authState !== 'authenticated') {
    return <div className="flex justify-center items-center h-screen"><p>Loading Profile...</p></div>;
  }

  return (
    <div className="flex justify-center items-start w-full p-4 pt-10 bg-gray-50 h-full">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">User Profile</h1>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {profileData.profilePicture ? (
              <img src={profileData.profilePicture} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"/>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-200">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            )}
            {isEditing && (
              <label className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
                <Edit3 className="w-4 h-4 text-white" />
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden"/>
              </label>
            )}
          </div>

          <div className="w-full text-center space-y-2">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              {isEditing ? (
                <input type="text" value={profileData.name} onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))} className="w-full text-center text-2xl font-semibold text-gray-900 bg-gray-100 border-b-2 border-blue-500 focus:outline-none p-1"/>
              ) : (
                <p className="text-2xl font-semibold text-gray-900">{profileData.name}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-md text-gray-600">{profileData.email}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 pt-4">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                <Save className="w-4 h-4 mr-2" /> Save
              </button>
              <button onClick={() => setIsEditing(false)} className="flex items-center px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                <X className="w-4 h-4 mr-2" /> Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="flex items-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
              <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}