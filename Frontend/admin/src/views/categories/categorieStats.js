import { useState, useEffect } from "react";
import { getAllCat } from "redux/cat/catActions";
import PieChart from "../components/Charts/PieChart";

const CategorieStats = ({ ...props }) => {

    useEffect(() => {
        props.AllC();
      }, []);

  const [categorieData, setCategorieData] = useState({
    labels: props.ListC.map((data) => data.nomcat),
    datasets: [
      {
        label: "Sous-catégorie",
        data: props.ListC.map((data) => data.souscategorie.length),
        backgroundColor: [
          "#2ECDF3",
          "#FFA88E",
          "#898989",
          "#FFA300",
          "#2CD5C4",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });
  
  return <PieChart chartData={categorieData}/>;
};

const mapStateToProps = (state) => ({
  ListC: state.categories.categories,
  isLoading: state.offres.loading,
  isAuth: state.auth.isAuthenticated,
  CodeMsg: state.offres.codeMsg,
});

const mapActionToProps = {
  AllC: getAllCat,
};

export default connect(mapStateToProps, mapActionToProps)(CategorieStats);
