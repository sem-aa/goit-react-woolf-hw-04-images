import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import Modal from './Modal';
import { ImageGallery } from './ImageGallery';
import { fetchImg } from 'services/apiPixaby';
import { Button } from './Button';

const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const data = await fetchImg(search, page);
        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalPages(Math.ceil(data.total / 12));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (search && page !== 0) {
      fetchImages();
    }
  }, [search, page]);

  const onSubmit = query => {
    setImages([]);
    setSearch(query);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = imageURL => {
    setSelectedImage(imageURL);
  };

  const closeModal = () => {
    setSelectedImage('');
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} onSelectImg={handleImageClick} />
      {loading && <span className="loader"></span>}
      {images.length > 0 && totalPages !== page && (
        <Button loadMore={loadMore} />
      )}
      {selectedImage && (
        <Modal srcImg={selectedImage} closeModal={closeModal} />
      )}
    </div>
  );
};

export default App;
