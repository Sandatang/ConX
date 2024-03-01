import React, { useState } from 'react';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Resources = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Mary Grace",
      profileImageUrl: null,
      postDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }),
      content: "Today let's take a moment to celebrate the incredible strength, resilience and grace that defines each and every one of you. ♥",
      likes: 109,
      comments: [],
      hidden: false
    },
    {
      id: 2,
      user: "Will Devana",
      profileImageUrl: null,
      postDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }),
      content: "Let's create a ripple effect of positivity and uplift each other! #WomanEmpowerment#FearlessFemales #GirlPower #ConXEmpower",
      likes: 450,
      comments: [],
      hidden: false
    },
    {
      id: 3,
      user: "Momsie",
      profileImageUrl: null,
      postDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }),
      content: "Let's spread love, encouragement, and support to all the incredible women out there! 💖 #WomenEmpowerment #GirlPower",
      likes: 320,
      comments: [],
      hidden: false
    },
    {
      id: 4,
      user: "Sweety",
      profileImageUrl: null,
      postDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }),
      content: "Together, we can break barriers and achieve greatness! 💪 #FearlessFemales #Empowerment #Unity",
      likes: 280,
      comments: [],
      hidden: false
    },
    {
      id: 5,
      user: "Sage",
      profileImageUrl: null,
      postDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }),
      content: "Every woman has a story of strength and resilience. Let's celebrate each other's journeys! 🌟 #WomenSupportingWomen #Inspiration",
      likes: 390,
      comments: [],
      hidden: false
    }
    
  ]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [isNewsfeedModalOpen, setIsNewsfeedModalOpen] = useState(false);
  const [commentPostId, setCommentPostId] = useState(null);
  const [hover, setHover] = useState(false);

  const handlePostSubmit = () => {
    if (newPostContent.trim() !== '' || newPostImage) {
      const newPost = {
        id: posts.length + 1,
        user: "Admin",
        profileImageUrl: null,
        postDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }),
        content: newPostContent,
        image: newPostImage,
        likes: 0,
        comments: [],
        hidden: false
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setNewPostImage(null);
      setIsNewsfeedModalOpen(false);
    }
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleCommentToggle = (postId) => {
    setCommentPostId(commentPostId === postId ? null : postId);
  };

  const handleCommentSubmit = (postId, comment) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
    }
  };

  const handleHidePost = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, hidden: true };
      }
      return post;
    });
    setPosts(updatedPosts);
    setTimeout(() => {
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return { ...post, hidden: false };
        }
        return post;
      });
      setPosts(updatedPosts);
    }, 5000); // Undo within 5 seconds
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Resources</h2>

      {/* Post Form */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <AccountCircleIcon className="w-12 h-12 rounded-full mr-4" /> {/* Icon for profile picture */}
          <div className="relative w-full">
            <textarea
              onClick={() => setIsNewsfeedModalOpen(true)} // Open Newsfeed modal only
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              rows="4"
            />
            {/* Insert Photo Icon */}
            <div className="absolute bottom-2 right-2">
              <InsertPhotoIcon
                className="text-gray-500 cursor-pointer"
                onClick={() => document.getElementById('newsfeed-modal-image-upload').click()}
                title="Photo"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              />
              {hover && (
                <span className="absolute bg-gray-800 text-white text-xs rounded-md py-1 px-2 bottom-full left-0 transform translate-y-2">
                  Photo
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Display Posts */}
      {posts.map(post => (
        <div key={post.id} className={`mb-8 p-4 border rounded-md ${post.hidden ? 'hidden' : ''}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <AccountCircleIcon className="w-8 h-8 rounded-full mr-2" /> {/* Icon for profile picture */}
              <p className="text-gray-700">{post.user}</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-gray-500 hover:text-red-600 focus:outline-none" onClick={() => handleDeletePost(post.id)}>
                <DeleteIcon />
              </button>
              <button className="text-gray-500 hover:text-red-600 focus:outline-none" onClick={() => handleHidePost(post.id)}>
                <VisibilityOffIcon />
              </button>
            </div>
          </div>
          <p className="text-gray-800 mb-2">{post.content}</p>
          {post.image && (
            <img src={post.image} alt="Post" className="mb-2 rounded-lg shadow-md" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          )}
          <div className="flex items-center mb-2">
            <button className="flex items-center mr-4 text-gray-500 hover:text-red-600 focus:outline-none" onClick={() => handleLike(post.id)}>
              <FavoriteIcon />
              <span className="ml-1">{post.likes}</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-blue-600 focus:outline-none" onClick={() => handleCommentToggle(post.id)}>
              <ChatIcon />
              <span className="ml-1">{post.comments.length}</span>
            </button>
          </div>
          {commentPostId === post.id && (
            <div>
              <textarea
                placeholder="Write a comment..."
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                rows="2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCommentSubmit(post.id, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
          )}
          <div>
            {post.comments.map((comment, index) => (
              <p key={index} className="text-gray-700">{comment}</p>
            ))}
          </div>
          <p className="text-gray-500 text-sm">{post.postDate}</p>
        </div>
      ))}

      {/* Newsfeed Modal */}
      {isNewsfeedModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800 mx-auto">Create Post</h3>
              <button
                className="text-gray-400 hover:text-red-600 "
                onClick={() => setIsNewsfeedModalOpen(false)}
              >
                X
              </button>
            </div>

            {/* Modal content */}
            <div className="p-4">
              <div className="flex items-center mb-4">
                <AccountCircleIcon className="w-12 h-12 rounded-full mr-4" /> {/* Icon for profile picture */}
                <div className="relative w-full">
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 text-gray-800 resize-none relative"
                    rows="4"
                  />
                  {/* Insert Photo Icon */}
                  <div className="absolute bottom-2 right-2">
                    <InsertPhotoIcon
                      className="text-gray-500 cursor-pointer"
                      onClick={() => document.getElementById('newsfeed-modal-image-upload').click()}
                      title="Photo"
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                    />
                    {hover && (
                      <span className="absolute bg-gray-800 text-white text-xs rounded-md py-1 px-2 bottom-full left-0 transform translate-y-2">
                        Photo
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* Image Upload */}
              <label className="block mb-4" title="Insert Image">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewPostImage(URL.createObjectURL(e.target.files[0]))}
                  className="hidden"
                  id="newsfeed-modal-image-upload"
                />
              </label>

              {newPostImage && (
                <img src={newPostImage} alt="Preview" className="mb-4 rounded-lg shadow-md" style={{ maxWidth: '100%', maxHeight: '300px' }} />
              )}
              <button
                onClick={handlePostSubmit}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md w-full"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
