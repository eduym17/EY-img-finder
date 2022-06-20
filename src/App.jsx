import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import './header.css';
import './content.css';
import './article.css';

const App = () => {
  const [photos, setPhotos] = useState([])
  const [search, setSearch] = useState()
  // console.log({ photos });
  const open = url => window.open(url)
  return (
    <div className='body'>
      <header>
        <Formik
          initialValues = {{ search: '' }}
          onSubmit={async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID -m8aHtXHm6SHi0dzq0zUcHILvrYkJKPab_pBxoi3GWY'
              }
            })
            const data = await response.json()
            console.log(data)
            setPhotos(data.results)
            setSearch(values.search)
          }}
        >
          <Form className='form'>
            <p>☄️ Getting images from Unsplash API</p>
            <Field name='search' placeholder="Search here" />
          </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='query'>
          {photos.length === 0
          ? 'Make a query!'
          : `'${search}' query has ${photos.length} results:`}
        </div>
        <div className={`${photos.length === 0 ? 'center-empty': 'center'}`} >
          {photos.map(photo =>
          <article key={photo.id} onClick={() => open(photo.links.html)}>
            <img src={photo.urls.regular} />
            <p>{[photo.description, photo.alt_description].join(' - ')}</p>
          </article>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
