// MUI
import { Stack } from '@mui/material';
// App Components
import ProjectProgressTasksConcept from './Tasks/Favorites';

const ProjectProgress = (props) => {
  return (
    <Stack spacing={1}>
      <ProjectProgressTasksConcept isParent={true} {...props} />
    </Stack>
  );
};

export default ProjectProgress;
