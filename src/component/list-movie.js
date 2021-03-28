import React from 'react';
import { Link } from 'react-router-dom';
import slugify from 'react-slugify';
import { Row, Col, Card } from 'antd';
const { Meta } = Card;

const ListMovieComponent = (props) => {
    return (
        <Row style={{ margin: '20px 0' }}>
            {props.ListMoviesPages.map((item, index) => (
                <Col key={index} span={4}>
                    <Link to={`/movie/${slugify(item.title)}~${item.id}`}>
                        <Card
                            hoverable
                            style={{ width: 200 }}
                            cover={<img alt={item.title} src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`} />}
                        >
                            <Meta title={item.title} />
                        </Card>
                    </Link>

                </Col>
            ))}
        </Row>
    )
}
export default ListMovieComponent;