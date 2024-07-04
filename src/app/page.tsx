'use client'; // This indicates that the component uses client-side features
import { getServerInfo } from '@/services/api';
import { useEffect, useState } from 'react';
export default function Home() {
  const [palworldIP, setPalworldIP] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('pal_ip') || '';
    }
    return '';
  });
  const [serverInfo, setServerInfo] = useState<ServerInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (event:any) => {
    setPalworldIP(event.target.value);
  };
  const handleSaveIP = async () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pal_ip', palworldIP);
      setIsLoading(true);
      try {
        const data = await getServerInfo(palworldIP);
        setServerInfo(data); 
      } catch (error) {
        console.error("Error fetching server info:", error);
        // Handle the error appropriately (e.g., display an error message)
        setServerInfo(null);
      } finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (palworldIP) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const data = await getServerInfo(palworldIP);
          setServerInfo(data);
        } catch (error) {
          console.error("Error fetching server info:", error);
          setServerInfo(null);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData(); // Initial fetch
      intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [palworldIP]); 
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-10">
      <div>

        <h1 className="text-2xl font-bold text-center dark:text-white ">
          Palworld monitor
        </h1>
        {/* Create an input field for Palworld IP with button at the side */}
        <div className="flex items-center pt-5">
          <input
            type="text"
            placeholder="Palworld IP"
            className="border border-gray-300 rounded-lg p-2 mr-2 text-black"
            value={palworldIP}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
            onClick={handleSaveIP}
          >
            Save
          </button>
        </div>
        {/* Component here */}

      </div>
    </main>
  );
}
