import {
  DefaultFocus,
  SpatialNavigationNode,
  SpatialNavigationScrollView,
} from 'react-tv-space-navigation';
import { Page } from '../components/Page';
import '../components/configureRemoteControl';
import { programInfos } from '../modules/program/infra/programInfos';
import styled from '@emotion/native';
import { scaledPixels } from '../design-system/helpers/scaledPixels';
import { LongProgramNode, ProgramNode } from '../modules/program/view/ProgramNode';
import { theme } from '../design-system/theme/theme';

const HEADER_SIZE = scaledPixels(400);

export const GridWithLongNodesPage = () => {
  return (
    <Page>
      <CenteringView>
        <GridContainer>
          <SpatialNavigationScrollView offsetFromStart={HEADER_SIZE + 20}>
            <SpatialNavigationNode alignInGrid>
              <DefaultFocus>
                <>
                  <FirstRow />
                  <SecondRow />
                </>
              </DefaultFocus>
            </SpatialNavigationNode>
          </SpatialNavigationScrollView>
        </GridContainer>
      </CenteringView>
    </Page>
  );
};

const FirstRow = () => {
  return (
    <SpatialNavigationNode orientation="horizontal">
      <ListContainer>
        <LongProgramNode programInfo={programInfos[0]} indexRange={[0, 1]} />
        <ProgramNode programInfo={programInfos[1]} indexRange={[2, 2]} />
        <ProgramNode programInfo={programInfos[2]} indexRange={[3, 3]} />
        <LongProgramNode programInfo={programInfos[3]} indexRange={[4, 5]} />
        <ProgramNode programInfo={programInfos[4]} indexRange={[6, 6]} />
      </ListContainer>
    </SpatialNavigationNode>
  );
};

const SecondRow = () => {
  const programs = programInfos.slice(6, 13);
  return (
    <SpatialNavigationNode orientation="horizontal">
      <ListContainer>
        {/* <LongProgramNode programInfo={programInfos[0]} indexRange={[0, 1]} /> */}
        {programs.map((program) => {
          return <ProgramNode programInfo={program} key={program.id} />;
        })}
      </ListContainer>
    </SpatialNavigationNode>
  );
};

const ListContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacings.$4,
  padding: theme.spacings.$4,
}));

const GridContainer = styled.View({
  backgroundColor: theme.colors.background.mainHover,
  margin: 'auto',
  height: '95%',
  width: '88%',
  borderRadius: scaledPixels(20),
  padding: scaledPixels(30),
});

const CenteringView = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});
