import { useDispatch, useSelector } from "react-redux"
import ContentLoader from './../../components/loader/contentLoader';
import Error from "../../components/error/index";
import Card from "./Card";
import { useParams } from "react-router-dom";
import { getDetails } from './../../redux/actions';

const Content = () => {
  const { country } = useParams()
  const dispatch = useDispatch()
  // store a abone olduk
  const { isLoading, error, data } = useSelector((store) => store.covid)


  // data nenesnesini diziye çevirdik
  const arr = data
    ? Object.entries(data).filter(([key]) => !["flag", "country", "continent"].includes(key))
    : [];

  // api isteğini atmaya yarayan function ı tetikler
  const refetch = () => dispatch(getDetails(country))

  return (
    <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading ? (<ContentLoader />)
        : error ? (<Error info={error} refetch={refetch} />)
          : (
            arr.map((item) => <Card key={item[0]} item={item} />)
          )}
    </div>
  )
}

export default Content