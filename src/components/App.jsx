import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImage } from './server/fetchApp';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoaderIcon } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImg, setCurrentImg] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!search) {
      console.log('no render');
      return;
    }
    setLoader(true);
    getImage(search, page).then(data => {
      try {
        if (!data.hits.length) {
          setLoader(false);
          return toast.error('Enter a valid search');
        }
        setImages(state => [...state, ...data.hits]);
        setLoader(false);
        if (page === 1) {
          setTotalHits(data.totalHits);
        }
        if (page > 1) {
          setTotalHits(state => state - 12);
        }
      } catch (error) {
        setLoader(false);
        return toast.error('Please try later server not responding');
      }
    });
  }, [search, page]);

  const togleModal = () => {
    setShowModal(state => !state);
  };

  const onClick = ({ target: { src } }) => {
    const currentImg = images.find(el => el.webformatURL === src);
    setCurrentImg(currentImg.largeImageURL);
    togleModal();
  };

  const handlSearch = ({ search }) => {
    setPage(1);
    setImages([]);
    setSearch(search);
  };

  const handlClickLoadMore = () => {
    setPage(state => state + 1);
  };
  return (
    <div className="App">
      <Searchbar onSubmit={handlSearch} />
      <ImageGallery children images={images} onClick={() => onClick} />
      {loader && <LoaderIcon />}
      {search && images.length !== 0 && !loader && totalHits > 12 && (
        <Button onClick={handlClickLoadMore} />
      )}
      {showModal && (
        <Modal onClose={togleModal}>
          <img src={currentImg} alt="" />
        </Modal>
      )}
      <ToastContainer autoClose={3000} position="top-center" theme="dark" />
    </div>
  );
};
