import React, { useState } from 'react';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import storeImage from "../assets/store.png";
import sample3Image from "../assets/sample3.png";

const Newsfeed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Bebot",
      profileImageUrl: null,
      postDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }),
      content: "Grateful to ConX: Connecting and Empowering Women in Metro Cebu Barangays for linking me to a crucial program in my barangay. Today, I proudly run my own small sari-sari store, empowered by the opportunities it brought. #ConXEmpowers",
      image: storeImage,
      likes: 109,
      comments: []
    },
    {
      id: 2,
      user: "Nicole",
      profileImageUrl: null,
      postDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }),
      content: "Empowered and unapologetic. Training in boxing for self-defense not only strengthens my body but also my spirit. #SelfDefense #Empowerment",
      image: sample3Image,
      likes: 450,
      comments: []
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
        comments: []
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Newsfeed</h2>

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
        <div key={post.id} className="mb-8 p-4 border rounded-md">
          <div className="flex items-center mb-2">
            <AccountCircleIcon className="w-8 h-8 rounded-full mr-2" /> {/* Icon for profile picture */}
            <p className="text-gray-700">{post.user}</p>
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

export default Newsfeed;
