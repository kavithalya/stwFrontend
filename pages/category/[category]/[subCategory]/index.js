import React from 'react';
import { useRouter } from 'next/router'
import CommonLayout from '../../../../components/shop/common-layout';
import { withApollo } from '../../../../helpers/apollo/apollo';
import ProductList from '../../../shop/common/productList';
import { Row, Container } from 'reactstrap';
import { CategoryList } from '../../../../services/script';

const LeftSidebar = () => {
  
  const router = useRouter();
  const category = router.query.category;
  const subCategory = router.query.subCategory;
  
  
  var MCategory = "";
  var MSCategory = "";
 
  for(var i=0; i<CategoryList.length ;i++)
      {
          if(CategoryList[i].subCategoryList!=undefined && CategoryList[i].MenuKey==category)
          {
            MCategory = CategoryList[i].CategoryName;
            for(var j=0;j<CategoryList[i].subCategoryList.length ;j++)
              {
                  if(CategoryList[i].subCategoryList[j].MenuKey == subCategory)
                  {
                    MSCategory = CategoryList[i].subCategoryList[j].SubCategoryName;
                  }
              }
          }
      }
   
  return (
    <CommonLayout title={MCategory} subTitle={MSCategory} parent="home" >
    {/* <section className="section-b-space"> */}
   <Container>
       <Row>
           <ProductList colClass="col-lg-3 col-6 col-grid-box" layoutList='' type="SubCategory" parentCategory={category} pathId={subCategory} noSidebar={true} />
       </Row>
   </Container>
   {/* </section> */}
</CommonLayout>
  );
}


export default withApollo(LeftSidebar);