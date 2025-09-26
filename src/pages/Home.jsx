import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import ProfileCard from '../components/ProfileCard';
import CreatePostModal from '../components/CreatePostModal';
import '../styles/Home.css';

function Home() {
  const { currentUser } = useAuth();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState([]);

  // Mock posts data
  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        user: {
          name: 'John Athlete',
          username: '@johnathlete',
          profileImage: '/uploads/1725511480432.jpg'
        },
        content: 'Just finished an amazing training session! 💪',
        image: '/uploads/1725596628282.jpg',
        timestamp: '2 hours ago',
        likes: 24,
        comments: 8
      },
      {
        id: 2,
        user: {
          name: 'Sports Club Delhi',
          username: '@sportsclubdelhi',
          profileImage: '/uploads/1725511543584.jpg'
        },
        content: 'Registration open for upcoming championship!',
        image: '/uploads/1725596998564.jpg',
        timestamp: '4 hours ago',
        likes: 45,
        comments: 12
      },
      {
        id: 3,
        user: {
          name: 'Maria Runner',
          username: '@mariarunner',
          profileImage: '/uploads/1725511676210.jpg'
        },
        content: 'Morning run complete! Perfect weather today 🏃‍♀️',
        image: '/uploads/1725597049937.jpg',
        timestamp: '6 hours ago',
        likes: 18,
        comments: 5
      }
    ];
    setPosts(mockPosts);
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const handleCreatePost = (postData) => {
    const newPost = {
      id: Date.now(),
      user: {
        name: currentUser.name,
        username: `@${currentUser.username}`,
        profileImage: currentUser.profileImage || '/uploads/1725511480432.jpg'
      },
      content: postData.description,
      image: postData.image,
      timestamp: 'Just now',
      likes: 0,
      comments: 0
    };
    setPosts([newPost, ...posts]);
    setShowCreatePost(false);
  };

  return (
    <div className="home-page">
      <Navigation />
      
      <main>
        <div className="container">
          {/* LEFT SIDEBAR */}
          <div className="left">
            <ProfileCard />
            <Sidebar />
            
            <button 
              className="btn btn-primary create-post-btn" 
              onClick={() => setShowCreatePost(true)}
            >
              Create Post
            </button>
          </div>

          {/* MIDDLE - MAIN FEED */}
          <div className="middle">
            <div className="feeds">
              {posts.map(post => (
                <div key={post.id} className="feed">
                  <div className="head">
                    <div className="user">
                      <div className="profile-photo">
                        <img src={post.user.profileImage} alt="Profile" />
                      </div>
                      <div className="info">
                        <h3>{post.user.name}</h3>
                        <small>{post.user.username} • {post.timestamp}</small>
                      </div>
                    </div>
                    <span className="edit">
                      <i className="uil uil-ellipsis-h"></i>
                    </span>
                  </div>

                  <div className="photo">
                    {post.image && <img src={post.image} alt="Post" />}
                  </div>

                  <div className="action-buttons">
                    <div className="interaction-buttons">
                      <span><i className="uil uil-heart"></i></span>
                      <span><i className="uil uil-comment-dots"></i></span>
                      <span><i className="uil uil-share-alt"></i></span>
                    </div>
                    <div className="bookmark">
                      <span><i className="uil uil-bookmark-full"></i></span>
                    </div>
                  </div>

                  <div className="liked-by">
                    <span><img src="/uploads/1725511480432.jpg" alt="" /></span>
                    <span><img src="/uploads/1725511543584.jpg" alt="" /></span>
                    <span><img src="/uploads/1725511676210.jpg" alt="" /></span>
                    <p>Liked by <b>ernest_achiever</b> and <b>{post.likes} others</b></p>
                  </div>

                  <div className="caption">
                    <p><b>{post.user.name}</b> {post.content}</p>
                  </div>

                  <div className="comments text-muted">
                    View all {post.comments} comments
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="right">
            <div className="messages">
              <div className="heading">
                <h4>Live Streams</h4>
                <i className="uil uil-edit"></i>
              </div>
              
              <div className="live-streams">
                {[1, 2, 3].map(index => (
                  <div key={index} className="live-container">
                    <div className="profile-button">
                      <div className="profile-photo">
                        <img src={`/uploads/172551${1480432 + index * 100}.jpg`} alt="Profile" />
                      </div>
                      <div className="profile-details">
                        <h4>Athlete {index}</h4>
                        <p>@athlete{index}</p>
                      </div>
                    </div>
                    <div className="live-video">
                      <div className="video-placeholder">
                        <i className="uil uil-play-circle"></i>
                        <p>Live Training Session</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {showCreatePost && (
        <CreatePostModal
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePost}
        />
      )}
    </div>
  );
}

export default Home;