import { useCallback, useEffect, useState } from "react";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";

import toast from "react-hot-toast";
import Spinner from "../components/Spinner";



const HomePage = () => {

  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]) ;
  const [loading, setLoading] = useState(false);

	const [sortType, setSortType] = useState("forks")
  

  const getUserProfileAndRepos = useCallback(async()=>
    {
      setLoading(true)
      try{
        const userRes = await fetch('https://api.github.com/users/salmanrancho')
        const userProfile = await userRes.json();
        setUserProfile(userProfile)
  
        const repoRes = await fetch(userProfile.repos_url);
        const repos = await repoRes
        .json();
        setRepos(repos);
        console.log("user profile:", userProfile)
        console.log("user repos:", repos)
        
      }catch (error){
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    },[])


  useEffect(()=>{
    getUserProfileAndRepos();
  },[getUserProfileAndRepos])


  

	return (
		<div className='m-4'>
			<Search />
			<SortRepos />
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
				{userProfile && !loading && <ProfileInfo userProfile={userProfile}/>}
				{repos && !loading && <Repos repos={repos}/>}
				{loading && <Spinner/>}
			</div>
		</div>
	);
};

export default HomePage
