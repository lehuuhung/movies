import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Pagination } from 'antd';
import LayoutComponent from '../component/layout';
import { getDataMovies, getDataNewFilm } from '../services/api';
import LoadingData from '../component/loading-data';
import ListMovieComponent from '../component/list-movie';

const { Meta } = Card;
const HomePage = () => {
    const [loadingHome, setLoadingHome] = useState(false);
    const [movies, setMovies] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        // gọi hàm 
        const getData = async () => {
            setLoadingHome(true);
            const data = await getDataMovies(page);
            // nếu Data trả về 
            if (data) {
                setMovies(data.results);
                setTotalItem(data.total_results);
                if (page < 1) {
                    setPage(1);
                }
                else if (page > data.total_pages) {
                    setPage(data.total_pages);
                }
                setLoadingHome(false);
            }

        }
        getData();
    }, [page])

    //  page dùng để phân trang khi thay đổi page thì useEffect sẽ chạy lại  giống componentDidUpdate
    const changePage = (pages) => {
        setPage(pages);
    }

    if (loadingHome || movies.length === 0) {
        // chưa có dữ liệu trả về thì sẽ chạy vào đây
        return (
            <LayoutComponent>
                <LoadingData />
            </LayoutComponent>
        )
    }

    return (
        <LayoutComponent>
            <ListMovieComponent ListMoviesPages={movies} />
          
            {/* <Row style={{ textAlign: 'center' }}>
                <Col span={24}>
                    <Pagination
                        current={page}
                        pageSize={20}
                        total={totalItem}
                        onChange={(pages) => changePage(pages)}
                    />
                </Col>
            </Row> */}
        </LayoutComponent>
    )
}

export default HomePage;