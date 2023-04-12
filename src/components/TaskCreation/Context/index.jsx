import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const TaskCreationContext = createContext();

export function TaskCreationProvider({ children }) {
  const [team, setTeam] = useState('');
  const [taskType, setTaskType] = useState('');
  const [subTask, setSubTask] = useState('');
  const [partner, setPartner] = useState('');
  const [concept, setConcept] = useState('');
  const [campaign, setCampaign] = useState('');
  const [channel, setChannel] = useState('');
  const [sizes, setSizes] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [tags, setTags] = useState([]);
  const [isRefresh, setIsRefresh] = useState(null);
  const [asset, setAsset] = useState([]);
  const [referenceLinks, setReferenceLinks] = useState([]);
  const [additionalInformation, setAdditionalInformation] = useState('');

  const clearAll = () => {
    setTeam('');
    setTaskType('');
    setSubTask('');
    setPartner('');
    setConcept('');
    setChannel('');
    setAsset([]);
    setSizes([]);
    setReferenceLinks([]);
  };

  return (
    <TaskCreationContext.Provider
      value={{
        team,
        setTeam,
        taskType,
        setTaskType,
        subTask,
        setSubTask,
        partner,
        setPartner,
        concept,
        setConcept,
        campaign,
        setCampaign,
        channel,
        setChannel,
        asset,
        setAsset,
        sizes,
        setSizes,
        referenceLinks,
        setReferenceLinks,
        deliveryDate,
        setDeliveryDate,
        tags,
        setTags,
        isRefresh,
        setIsRefresh,
        additionalInformation,
        setAdditionalInformation,
        clearAll,
      }}
    >
      {children}
    </TaskCreationContext.Provider>
  );
}

TaskCreationProvider.propTypes = {
  children: PropTypes.any,
};

export default TaskCreationContext;
