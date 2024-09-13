import styled from '@emotion/native';
import { Page } from '../components/Page';
import { getPrograms } from '../modules/program/infra/programInfos';
import { SpatialNavigationView } from '../../../lib/src/spatial-navigation/components/View';
import { scaledPixels } from '../design-system/helpers/scaledPixels';
import { DefaultFocus } from '../../../lib/src/spatial-navigation/context/DefaultFocusContext';
import { SpatialNavigationNode } from '../../../lib/src/spatial-navigation/components/Node';
import { Spacer } from '../design-system/components/Spacer';
import { Button } from '../design-system/components/Button';
import { useState } from 'react';
import { ProgramsRow } from '../modules/program/view/ProgramList';
import { useTheme } from '@emotion/react';

const ROW_PADDING = scaledPixels(70);

const MAX = 1000;

export const ListWithVariableSize = () => {
  const theme = useTheme();
  const [programsBase, setProgramsBase] = useState(getPrograms(MAX));

  const [numberOfPrograms, setNumberOfPrograms] = useState(4);

  const addItem = () => {
    setNumberOfPrograms((prev) => {
      if (prev === MAX) return prev;

      return prev + 1;
    });
  };

  const removeItem = () => {
    setNumberOfPrograms((prev) => {
      if (prev === 0) return prev;
      return prev - 1;
    });
  };

  const shuffleItems = () => {
    setProgramsBase((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const programs = programsBase.slice(0, numberOfPrograms);

  return (
    <Page>
      <DefaultFocus>
        <Container>
          <SpatialNavigationNode orientation="horizontal">
            <ListContainer>
              <ProgramsRow
                data={programs}
                containerStyle={{ height: theme.sizes.program.portrait.height + ROW_PADDING }}
              />
            </ListContainer>
          </SpatialNavigationNode>
          <Spacer gap="$6" />
          <SpatialNavigationView direction="vertical">
            <Button label="Add item" onSelect={addItem} />
            <Button label="Remove item" onSelect={removeItem} />
            <Button label="Shuffle items" onSelect={shuffleItems} />
          </SpatialNavigationView>
        </Container>
      </DefaultFocus>
    </Page>
  );
};

const Container = styled.View({
  flex: 1,
  padding: scaledPixels(30),
});

const ListContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacings.$4,
  padding: theme.spacings.$4,
}));
