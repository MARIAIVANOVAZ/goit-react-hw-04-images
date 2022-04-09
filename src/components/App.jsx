import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TailSpin } from 'react-loader-spinner';

import Fetch from '../services/fetch';

import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  const PER_PAGE = 12;

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    const fetchImages = () => {
      setLoading(true);

      Fetch(inputValue, page, PER_PAGE)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('nothing found'));
        })
        .then(images => {
          if (images.totalHits === 0) {
            toast.warn('Nothing found with your search query');
            return;
          }

          setImages(prevImage => [...prevImage, ...images.hits]);
          setTotalPages(Math.ceil(images.totalHits / PER_PAGE));
          // setTotalHits(images.totalHits);
        })
        .catch(error => setError(error))
        .finally(() => {
          setLoading(false);
        });
    };
    fetchImages();
  }, [page, inputValue]);

  const handleSearchSubmit = inputValue => {
    setInputValue(inputValue);
    setImages([]);
    setPage(1);
    setTotalPages(0);
  };

  const onSetPage = () => {
    setPage(prevState => prevState + 1);
  };
  const openModal = largeImageURL => {
    setModalImage(largeImageURL);
    toggleModal();
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 16,
        paddingBottom: 24,
      }}
    >
      <SearchBar onSubmit={handleSearchSubmit} />
      {!inputValue && <h2>Enter your search query!</h2>}

      <ImageGallery images={images} onClick={openModal} />

      {totalPages > 1 && page !== totalPages && <Button onClick={onSetPage} />}

      {loading && (
        <TailSpin height="100" width="100" color="grey" ariaLabel="loading" />
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImage} alt={modalImage} />
        </Modal>
      )}
      {error && <h3>{error.message}</h3>}
      <ToastContainer autoClose={3000} position="top-center" />
    </div>
  );
}

export default App;
