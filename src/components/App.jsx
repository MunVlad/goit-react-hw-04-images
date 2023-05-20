import React, { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

  const URL = 'https://pixabay.com/api/';
  const API_KEY = '34819377-6f2fdaa19d640f1c7c6daae71';

export default function App () {

  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    const fetchImg = async () => {
      if (query === '') {
        return;
      }

      setStatus('pending');
      try {
        const response = await fetch(
          `${URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );

        if (response.ok) {
          const pictures = await response.json();

          if (!pictures.total) {
            toast.error('Did find anything, mate');
          }

          const selectedProperties = pictures.hits.map(({ id, largeImageURL, webformatURL }) => ({
            id,
            largeImageURL,
            webformatURL,
          }));

          setPictures(prevPictures => [...prevPictures, ...selectedProperties]);
          setStatus('resolved');
          setTotalHits(pictures.total);
        } else {
          throw new Error('Failed to find any images');
        }
      } catch (error) {
        setStatus('rejected');
      }
    };

    fetchImg();
  }, [query, page]);

  const processSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setPictures([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={processSubmit} />
      {pictures.length > 0 && <ImageGallery images={pictures} />}
      {totalHits > pictures.length && <Button onClick={handleLoadMore} />}
      {status === 'pending' && <Loader />}
      <ToastContainer autoClose={2000} />
    </>
  );
};
