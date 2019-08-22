import * as React from 'react';
import { DashboardSideBar } from '/imports/client/UserDashboard/components/DashboardSideBar';
import { RecentsPage } from '/imports/client/UserDashboard/components/RecentsPage';
import { DraftsPage } from '/imports/client/UserDashboard/components/DraftsPage';
import { SessionsPage } from '/imports/client/UserDashboard/components/SessionsPage';
import { DraftsListT, SessionsListT } from '/imports/ui/Types/types';

type DashboardContentContainerPropsT = {
  draftsList: DraftsListT,
  sessionsList: SessionsListT
};
export const DashboardContentContainer = ({
  draftsList,
  sessionsList
}: DashboardContentContainerPropsT) => {
  const [selectedPage, setSelectedPage] = React.useState({
    sessionsView: false,
    draftsView: false,
    recentsView: true
  });
  const [activePage, setActivePage] = React.useState('Recents');

  const onSelectRecentsView = () => {
    setActivePage('Recents');
    setSelectedPage({
      sessionsView: false,
      draftsView: false,
      recentsView: true
    });
  };
  const onSelectSessionsView = () => {
    setActivePage('Sessions');
    setSelectedPage({
      sessionsView: true,
      recentsView: false,
      draftsView: false
    });
  };
  const onSelectDraftsView = () => {
    setActivePage('Drafts');
    setSelectedPage({
      sessionsView: false,
      draftsView: true,
      recentsView: false
    });
  };

  const ComponentToRender = () => {
    switch (activePage) {
      case 'Recents':
        return (
          <RecentsPage
            sessionsList={sessionsList.slice(0, 6)}
            draftsList={draftsList.slice(0, 6)}
            moreCallbackSessions={onSelectSessionsView}
            moreCallbackDrafts={onSelectDraftsView}
          />
        );
      case 'Sessions':
        return <SessionsPage sessionsList={sessionsList} />;

      case 'Drafts':
        return <DraftsPage draftsList={draftsList} />;

      default:
        return (
          <RecentsPage
            sessionsList={sessionsList.slice(0, 6)}
            draftsList={draftsList.slice(0, 6)}
            moreCallbackSessions={onSelectSessionsView}
            moreCallbackDrafts={onSelectDraftsView}
          />
        );
    }
  };

  return (
    <DashboardSideBar
      callbackSessionsView={onSelectSessionsView}
      callbackRecentsView={onSelectRecentsView}
      callbackDraftsView={onSelectDraftsView}
      sessionsActive={selectedPage.sessionsView}
      draftsActive={selectedPage.draftsView}
      recentsActive={selectedPage.recentsView}
      activePage={activePage}
    >
      <ComponentToRender />
    </DashboardSideBar>
  );
};
