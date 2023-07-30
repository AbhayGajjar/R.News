import React from 'react'

const Newsitems =(props)=> {

        let { title, description, imageUrl, newsUrl, author, date,source } = props;
        return (
            <div>
                <div className="card my-3" >
                    <div className='d-flex justify-content-end position-absolute top-0 end-0'>
                    <span className="badge rounded-pill bg-danger">
                        {source} <span className="visually-hidden">unread messages</span>
                    </span>
                    </div>
                    
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author} on {date}</small></p>
                        <a href={newsUrl}  rel="noreferrer" target='_blank' className="btn btn-sm btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
}

export default Newsitems
