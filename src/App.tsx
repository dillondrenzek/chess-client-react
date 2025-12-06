import { BoardStage } from "./app/BoardStage";
import { useChessState } from "./hooks/use-chess-state";
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import {
  AppShell,
  Badge,
  Box,
  Burger,
  Button,
  Card,
  Center,
  Chip,
  Code,
  Container,
  Grid,
  Group,
  MantineProvider,
  Stack,
} from "@mantine/core";
import { SquareColor } from "./lib/chess-types";

const BOARD_HEIGHT = 500;
const BOARD_WIDTH = 500;

function App() {
  // const fenString = new URL(window.location.href).searchParams.get("fen");
  const {
    pieces,
    movePieceToSquare,
    ascii,
    turn,
    fen,
    isCheck,
    isCheckmate,
    isGameOver,
    reset,
  } = useChessState();

  const evaluation = -1.4;
  const evaluatedColor: SquareColor = evaluation > 0 ? "light" : "dark";

  const opened = false;
  const toggle = () => {};

  return (
    <MantineProvider>
      <AppShell
        padding="md"
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

          <div>Chess Client</div>
        </AppShell.Header>

        <AppShell.Aside>
          <Group p="md">
            <Stack>
              <Code>
                <pre>{fen}</pre>
              </Code>

              <Code>
                <pre>{ascii}</pre>
              </Code>

              <Group>
                {turn === "b" ? (
                  <Badge color="dark">Black</Badge>
                ) : (
                  <Badge color="gray">White</Badge>
                )}
                {isCheckmate ? <Badge color="green">Checkmate</Badge> : null}
                {!isCheckmate && isCheck ? (
                  <Badge color="yellow">Check</Badge>
                ) : null}
                {!isCheckmate && isGameOver ? (
                  <Badge color="gray">Game Over</Badge>
                ) : null}
              </Group>

              <Group>
                <Button onClick={reset}>Reset</Button>
              </Group>
            </Stack>
          </Group>
        </AppShell.Aside>

        <AppShell.Main>
          <Stack>
            <BoardStage
              height={BOARD_HEIGHT}
              width={BOARD_WIDTH}
              pieces={pieces}
              movePieceToSquare={movePieceToSquare}
            />
          </Stack>
        </AppShell.Main>
      </AppShell>

      <Container>
        <Center>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section></Card.Section>
          </Card>
        </Center>
      </Container>
    </MantineProvider>
  );
}

export default App;
