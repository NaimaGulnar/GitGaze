import "./App.css"
import { useState } from "react"
import SearchIcon from "@mui/icons-material/Search"

export default function App() {

  const [username, setUsername] = useState("")
  const [data, setData] = useState(null)
  const [repos, setRepos] = useState(null)
  const [followers, setFollowers] = useState(null)
  const [followings, setFollowings] = useState(null)

  const baseURL = "https://api.github.com/users/";
  const token = "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";

  async function fetchData(url, setState) {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const userData = await response.json();
      setState(userData);
    } catch (err) {
      <p>Error fetching data: ${err}</p>
    }
  }

  async function handleClick() {
    await fetchData(`${baseURL}${username}`, setData);
    await fetchData(`${baseURL}${username}/repos`, setRepos)
    await fetchData(`${baseURL}${username}/followers`, setFollowers)
    await fetchData(`${baseURL}${username}/following`, setFollowings)
    setUsername("");
  }

  function renderList(data, label) {
    return (
      <div className="lists">
        <p>{label}:</p>
        <ol>
          {data && data.length > 0 && (data.map(item => (<li key={item.id}><a href={item.html_url} target="_blank" rel="noopener noreferrer">{item.name || item.login}</a></li>)))}
        </ol>
      </div>
    )
  }

  return (
    <>
      <h1 className="heading">Welcome to GitGaze</h1>
      <p className="tagname">A platform to unveil GitHub profiles, projects, and networks - Just one click away!!</p>

      <div className="search">
        <input className="input" type="text" placeholder="Search for a GitHub User..." value={username} onChange={(e) => setUsername(e.target.value)} />
        <button className="btn" onClick={handleClick}><SearchIcon /></button>
      </div>

      <div className="data">
        {data && (
          <>
            <div className="user-information">
              <img src={data.avatar_url} className="img" />
              <div className="user-info">
                <p>Username: <span className="info">{data.login}</span></p>
                <p>Bio: <span className="info">{data.bio}</span></p>
                <a href={data.html_url} target="blank" rel="noopener noreferrer" className="link">GitHub Link</a>
              </div>
            </div>
            <div className="lists-container">
              {repos && (renderList(repos, "Repositories"))}
              {followers && (renderList(followers, "Followers"))}
              {followings && (renderList(followings, "Following"))}
            </div>
          </>
        )}
      </div>

    </>
  )
}
