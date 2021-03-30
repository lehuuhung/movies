import React, { useState } from 'react';
import { Row, Col, Input, Card, Pagination } from 'antd';
import LayoutComponent from '../component/layout';
import { searchMovieByKeywords } from '../services/api';
import LoadingData from '../component/loading-data';
import ListMovieComponent from '../component/list-movie';
const { Search } = Input;
// const { Meta } = Card;
const SearchFilmPage = () => {
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [pages, setPages] = useState(1);
    const [totalItem, setTotalItem] = useState(0);
    const [keyword, setKeyWord] = useState('');
    const [listMovies, setListMovies] = useState([]);
    const changeInput = (event) => {
        const val = event.target.value;
        setKeyWord(val);
    }
    const searchMovies = async (keywords , currentPage = 1) => {
     
        if (keywords.length > 0) {
            setLoadingSearch(true);
            const data = await searchMovieByKeywords(keywords, currentPage);
            if (data) {
                setListMovies(data.results);
                setTotalItem(data.total_results);
                setPages(currentPage)
                setLoadingSearch(false)
                window.scrollTo(0, 0)
            }
        }
    }
    if (loadingSearch && listMovies.length === 0) {
        return (
            <LayoutComponent>
                <LoadingData />
            </LayoutComponent>
        )
    }
    return (
        <LayoutComponent>
            <Row style={{ margin: '20px 0' }}>
                <Col span={12} offset={6}>
                    <Search
                        placeholder="input search text"
                        onSearch={(val) => searchMovies(val)}
                        enterButton
                        onChange={changeInput}
                        value={keyword}
                    />
                </Col>
                <ListMovieComponent ListMoviesPages={listMovies} />
                {listMovies.length > 0 ?
                    <Row style={{ textAlign: 'center' }}>
                        <Col span={24}>
                            <Pagination
                                current={pages}
                                pageSize={20}
                                total={totalItem}
                                onChange={(pages) => searchMovies(keyword,pages)}
                            />
                        </Col>
                    </Row> : null}
            </Row>
        </LayoutComponent>
    )
}
export default SearchFilmPage;