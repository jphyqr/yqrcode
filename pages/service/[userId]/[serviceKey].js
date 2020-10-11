import { services } from "../../../constants/types";
import ShowComponent from "../../../components/ShowComponent";
import styles from "../../../styles/Home.module.css";
import SelectProduct from "../../../components/SelectProduct";
import { useState } from "react";
const ServiceForUser = ({ user, service }) => {
  const { fields, products } = service || [];
  console.log({ service });
  console.log({ fields });
  const [_selectedProduct, selectProduct] = useState(null);

  return (
    <div className={styles.overlayContainer}>
      {products.length > 0 && !_selectedProduct && (
        <SelectProduct products={products} />
      )}

      <div className={styles.title}>{service.label}</div>
      {fields?.map((field, i) => {
        return (
          <div className={styles.formFieldContainer}>
            <label className={styles.formLabel}>{field.label}</label>
            <label className={styles.formDescription}>
              {field.description}
            </label>

            <ShowComponent key={i} component={field.component} />
          </div>
        );
      })}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { query } = context || {};

  let service = {
    key: query.serviceKey,
    ...services[`${query.serviceKey}`],
  };

  let user = {
    uid: query.userId,
  };

  return {
    props: {
      service,
      user,
    },
  };
}

export default ServiceForUser;
