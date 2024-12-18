import { useEffect, useState } from "react";
import { useGetUser } from "../ContextApi/GetUserProfileContext";

const useGetUserProfile = (username: string | undefined) => {
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile, fetchUserProfileByUsername } = useGetUser();

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;
      setIsLoading(true);
      await fetchUserProfileByUsername(username);
      setIsLoading(false);
    };

    fetchData();
  }, [username]);

  return { userProfile, isLoading };
};

export default useGetUserProfile;
