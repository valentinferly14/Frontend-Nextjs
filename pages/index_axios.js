import axios from 'axios'

const Home = ({restaurants, error}) => {
  if(error) {
    return <div>An Error Occured: {error.message}</div>
  }
  return (
    <div className='restauran'>
    <table border="1px">
      <tr>
        <th>ID</th>
        <th>Nama Restauran</th>
        <th>Deskripsi</th>
      </tr>
      {restaurants.data.map(restauran => (
        <tr>
        <td> {restauran.id} </td>
         <td>{restauran.attributes.name}</td> 
          <td>{restauran.attributes.description}</td>
        </tr>
      )
        )}
    </table>
    </div>
  )
}
// Request API Strapi dengan Axios
Home.getInitialProps = async ctx =>{
  try {
    const res = await axios.get("http://localhost:1337/api/restaurants");
    const restaurants = res.data
    return {restaurants}
    } catch (error) {
      return {error};
    }
} 

export default Home;
