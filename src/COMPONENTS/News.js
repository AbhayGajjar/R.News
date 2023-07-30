import React, { useEffect,useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=> {
   
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, settotalResults] = useState(0)
    const capitalization = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    // constructor(props) {
    //     super(props);
    //     console.log('i am a constructor from news.js');
    //     this.state = {
    //         articles: [],
    //         loading: false,
    //         page: 1,
    //         totalResults: 0,
    //     }
    //     document.title = `${this.capitalization(props.category)} News-terminators`
    // }

    const newsUpdate= async()=> {
        props.setProgress(20);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true })
        setloading(true)
        let data = await fetch(url)
        let parsedData = await data.json()
        props.setProgress(50)
        console.log(parsedData)
        setarticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setloading(false)
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
        props.setProgress(100)

    }

    // for fatching data in infinite scrollbar
    const fetchMoreData = async () => {
        // this.setState({ page: this.state.page + 1 })
      
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        setarticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
        setloading(false)
        // this.setState({
        //     articles: this.state.articles.concat(parsedData.articles),
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
    }

    useEffect(() => {
        newsUpdate();
    }, [])

    // async componentDidMount() {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d8fa4ae7244a404f93c0bf1347221e3a&page=1&pageSize=${props.pageSize}`;
    //     // this.setState({loading:true})
    //     // let data = await fetch(url)
    //     // let parsedData = await data.json()
    //     // console.log(parsedData)
    //     // this.setState({ articles: parsedData.articles,
    //     //      totalResults: parsedData.totalResults,
    //     //     loading:false
    //     //     })
    //     this.newsUpdate()}

    // const handleNext = async () => {
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d8fa4ae7244a404f93c0bf1347221e3a&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
        //     this.setState({loading:true})
        //     let data = await fetch(url)
        //     let parsedData = await data.json()
        //     console.log(parsedData)
        //     this.setState({ articles: parsedData.articles })
        //     this.setState({
        //         page: this.state.page + 1,
        //         loading:false
        //     })
        // }
        // else {}
        // this.setState({ page: this.state.page + 1 })
    //     setPage(page+1)
    //     newsUpdate()


    // }
    // const handlePrevious = async () => {
    //     console.log('Previous');
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d8fa4ae7244a404f93c0bf1347221e3a&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // console.log(parsedData)
        // this.setState({ articles: parsedData.articles })
        // this.setState({
        //     page: this.state - 1,
        //     loading:false
        // })
        // this.setState({ page: this.state.page - 1 })
    //     setPage(page-1)
    //     newsUpdate()
    // }
  

        return (
            <>
                <h2 className='text-center mt-5 mb-2 pt-4'>News Terminators - Top {capitalization(props.category)} Headlines</h2>
                {loading && <Spinner />}

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}>
                    <div className="container">
                        <div className="row">
                            {/*!this.state.loading &&*/ articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <Newsitem title={element.title ? element.title : ''} description={element.description ? element.description : ''} imageUrl={element.urlToImage ? element.urlToImage : `https://pbs.twimg.com/media/EUqNoepU4AIwT_D?format=jpg&name=small`} newsUrl={element.url} author={element.author ? element.author : 'Unknown'} date={new Date(element.publishedAt).toGMTString()} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>


                {/* {for the buttons of next and previous} */}
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                </div> */}

            </>
        )
    
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'

}
export default News
