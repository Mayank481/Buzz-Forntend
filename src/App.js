import './App.css';
import Login from './components/Login';
import Feeds from './components/Feeds';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Userprofile from './components/Userprofile';
import Selfprofile from './components/Selfprofile';
import Friends from './components/Friends';
import Admin from './components/Admin';
import { checkAuth } from './services/authServices';
import { getSuggestFriends } from './services/userservice';
import FullPageSpinner from './components/FullPageSpinner';

function App() {
  const [user, setUser] = useState(false);
  const [SFriend, setSFriend] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [refresh]);

  const toggleRefresh = () => setRefresh((p) => !p);

  async function fetchUser() {
    setLoading(true);
    let { success, user } = await checkAuth();
    success && setUser(user);
    if (user) {
      let friends = await getSuggestFriends();
      setSFriend([...friends]);
    }
    setLoading(false);
  }

  if (loading) {
    return <FullPageSpinner />;
  }

  return (
    <BrowserRouter>
      {user ? (
        <>
          <Navbar user={user} />
          <Routes>
            <Route
              path="/"
              element={<Feeds user={user} suggestFriend={SFriend} refresh={toggleRefresh} />}
            />
            <Route
              path="/profile"
              element={
                <Selfprofile
                  user={user}
                  refresh={toggleRefresh}
                  suggestFriend={SFriend}
                />
              }
            />
            <Route
              exact
              path="/friends"
              element={<Friends user={user} refresh={toggleRefresh} />}
            />
            <Route
              exact
              path="/profile/:id/"
              element={
                <Userprofile
                  myData={user}
                  suggestFriend={SFriend}
                  refresh={toggleRefresh}
                />
              }
            />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="*" element={<Login fetchUser={fetchUser} />} />
            <Route exact path="/admin" element={<Admin user={user} />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
