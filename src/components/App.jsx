import { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';
import getImages from '../api/imageAPI';
import { ImageGallery } from './ImageGallery/';
import { Searchbar } from './Searchbar/';
import { Modal } from './Modal/';
import { Button } from './Button/';

const statusList = {
  loading: 'loading',
  success: 'success',
  error: 'error',
  idle: 'idle',
};

export default class App extends Component {
  state = {
    images: [],
    resultLength: 0,
    searchQuery: '',
    currentPage: 1,
    isOpen: false,
    imageModal: {},
    status: statusList.idle,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.handleGetImages();
    }
  }

  handleGetImages = () => {
    this.setState({ status: statusList.loading });
    getImages(this.state.searchQuery, this.state.currentPage)
      .then(res =>
        this.setState(prevState => ({
          images: [...prevState.images, ...res.data.hits],
          status: statusList.success,
          resultLength: res.data.totalHits,
        }))
      )
      .catch(error => this.setState({ error, status: statusList.error }));
  };

  handleSubmit = value => {
    if (this.state.searchQuery.toLowerCase() === value.toLowerCase()) {
      alert('Try to search with new value, this already on you page');
      return;
    }
    if (this.state.searchQuery !== value) {
      this.setState({ searchQuery: value, currentPage: 1 });
      window.scrollTo(0, 0);
    }
  };

  setModalImg = ({ tags, largeImageURL }) => {
    this.setState({
      imageModal: { largeImageURL, tags },
      isOpen: true,
    });
  };

  toggleModal = e => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  loadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  render() {
    const { isOpen, imageModal, status, images, resultLength } = this.state;

    return (
      <div className="App">
        {isOpen && (
          <Modal toggleModal={this.toggleModal}>
            <img src={imageModal.largeImageURL} alt={imageModal.tag} />
          </Modal>
        )}
        {status === 'loading' && (
          <Modal>
            <TailSpin />
          </Modal>
        )}
        <Searchbar handleSubmit={this.handleSubmit} />
        {images.length > 0 || status === 'error' ? (
          <ImageGallery images={images} setModalImg={this.setModalImg} />
        ) : (
          <div className="container">
            {this.state.searchQuery.length === 0 ? (
              <h1>Search to find some images</h1>
            ) : (
              <>
                <h1>There are no images for your request</h1>
                <p>
                  Sorry, we couldn't find any images that match your search.
                  Please try again with different keywords.
                </p>
              </>
            )}
          </div>
        )}
        {resultLength > images.length && (
          <Button onClick={this.loadMore}>Load more</Button>
        )}
      </div>
    );
  }
}
