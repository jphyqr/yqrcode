import { services } from "../../../constants/types";

const ServiceForUser = ({ user, service }) => {
  return <div>{service.emoji}</div>;
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
