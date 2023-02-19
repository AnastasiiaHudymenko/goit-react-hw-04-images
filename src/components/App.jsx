import React from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImage } from './server/fetchApp';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoaderIcon } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends React.Component {
  state = {
    search: '',
    page: 1,
    images: [],
    loader: false,
    showModal: false,
    currentImg: '',
    totalHits: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { search: prevSearch, page: prevPage } = prevState;
    const { search, page } = this.state;

    if (prevSearch !== search || prevPage !== page) {
      try {
        this.setState({ loader: true });
        const respons = await getImage(search, page);
        const imagesList = respons.data;

        if (!imagesList.hits.length) {
          this.setState({ loader: false });
          return toast.error('Enter a valid search');
        }

        this.setState(({ images }) => ({
          images: [...images, ...imagesList.hits],
        }));
        this.setState({ loader: false });
        if (page === 1) {
          this.setState({ totalHits: imagesList.totalHits });
        }
        if (prevPage < page) {
          this.setState(({ totalHits }) => ({ totalHits: totalHits - 12 }));
        }
      } catch (error) {
        this.setState({ loader: false });
        return toast.error('Please try later server not responding');
      }
    }
  }

  togleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onClick = ({ target: { src } }) => {
    const { images } = this.state;
    const currentImg = images.find(el => el.webformatURL === src);
    this.setState({ currentImg: currentImg.largeImageURL });
    this.togleModal();
  };

  handlSearch = search => {
    this.setState({ page: 1, images: [] });
    this.setState(search);
  };

  handlClickLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const {
      handlSearch,
      onClick,
      handlClickLoadMore,
      togleModal,
      state: { images, loader, search, showModal, currentImg, totalHits },
    } = this;

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
  }
}
