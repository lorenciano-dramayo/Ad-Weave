import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ConceptContext = createContext();

export function ConceptProvider({ children }) {
  const [data, setData] = useState({});
  const [isCampaignVisible, setCampaignVisible] = useState(false);
  const [isTaskVisible, setTaskVisible] = useState(false);

  const showModal = (rowData, type) => {
    switch (type.toLowerCase()) {
      case 'campaigns':
        setCampaignVisible(true);
        break;
      default:
        setTaskVisible(true);
        break;
    }

    setData(rowData);
  };

  const hideModal = (type) => {
    switch (type.toLowerCase()) {
      case 'campaigns':
        setCampaignVisible(false);
        break;
      default:
        setTaskVisible(false);
        break;
    }

    setData({});
  };

  return (
    <ConceptContext.Provider
      value={{ showModal, hideModal, data, isTaskVisible, isCampaignVisible }}
    >
      {children}
    </ConceptContext.Provider>
  );
}

ConceptProvider.propTypes = {
  children: PropTypes.any,
};

export default ConceptContext;
