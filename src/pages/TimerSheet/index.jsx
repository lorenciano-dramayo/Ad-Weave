import { TimerSheetProvider } from 'pages/TimerSheet/Context';
import { TaskProvider } from 'pages/Task/Context';

// Components
import Main from 'pages/TimerSheet/views/Main';

export default function TimerSheet() {
  return (

    <TimerSheetProvider>

      <TaskProvider>
        <Main />
      </TaskProvider>

    </TimerSheetProvider>


  );
}
