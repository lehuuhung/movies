import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import { useParams } from "react-router-dom";
import LayoutComponent from '../component/layout';
import { getDataMoviesById } from '../services/api';
import LoadingData from '../component/loading-data';


const { Meta } = Card;
const DetailMoviesPage = () => {
    // lấy đc param từ url xuống và truyền đúng tên đặt ở url bên kia
    const { id } = useParams();
    // console.log(id, slug);

    // call  api dựa vào id của film 
    const [loadingDetail, setLoadingDetail] = useState(false);
    // gán cho object thay vì array là detail chỉ trả về 1 dữ liệu
    const [detailMovies, setDetailMovie] = useState({});


    // lấy useEffect để gọi api
    useEffect(() => {
        const getData = async () => {
            setLoadingDetail(true);
            const data = await getDataMoviesById(id);
            if (data) {
                setDetailMovie(data)
                setLoadingDetail(false)
            }
        }
        getData();
    }, [id]);

    //check detailMovies không rỗng
    if (loadingDetail && Object.keys(detailMovies).length === 0 && detailMovies.constructor === Object) {
        return (
            <LayoutComponent>
                <LoadingData />
            </LayoutComponent>
        )
    }
    console.log(detailMovies);
    return (
        <LayoutComponent>
            <Row style={{ margin: '20px 0' }}>
                <Col span={6}>

                    <img src={`https://image.tmdb.org/t/p/w300/${detailMovies.poster_path}`} class="img-responsive" alt={detailMovies.title} />

                    {/* <Card
                        hoverable
                        style={{ width: 300 }}
                        cover={<img alt={detailMovies.title} src={`https://image.tmdb.org/t/p/w300/${detailMovies.poster_path}`} />}
                    > */}
                    {/* <Meta title={detailMovies.title} /> */}
                    {/* </Card> */}
                </Col>
                <Col span={12}>
                    <h1>{detailMovies.title}</h1>
                    {detailMovies.overview ? (<p>Mô tả: {detailMovies.overview}</p>) : null }
                    
                    <p>Ngày sản xuất:{detailMovies.release_date}</p>
                    <p>Lượt xem:{detailMovies.vote_count}</p>
                    <p>Điểm:{detailMovies.vote_average}</p>
                </Col>
                <Col span={6} style={{height:'500px',  overflowY: 'scroll' }}>
                    <Row>
                        {detailMovies.images !== undefined ? detailMovies.images.backdrops.map((item, index) => (
                            <Col span={24} key={index}>
                                <img src={`https://image.tmdb.org/t/p/w300/${item.file_path}`} class="img-responsive" alt={detailMovies.title} />
                            </Col>
                        )) : null}
                    </Row>

                </Col>

            </Row>
        </LayoutComponent>
    )
}

export default DetailMoviesPage;