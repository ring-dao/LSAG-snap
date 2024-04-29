import styled from 'styled-components';

import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  SendHelloButton,
  Card,
} from '../components';
import { defaultSnapOrigin } from '../config';
import {
  useMetaMask,
  useInvokeSnap,
  useMetaMaskContext,
  useRequestSnap,
} from '../hooks';
import { isLocalSnap, shouldDisplayReconnectButton } from '../utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary?.default};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 64.8rem;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
`;

const Notice = styled.div`
  background-color: ${({ theme }) => theme.colors.background?.alternative};
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  color: ${({ theme }) => theme.colors.text?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;

  & > * {
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.small} {
    margin-top: 1.2rem;
    padding: 1.6rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error?.muted};
  border: 1px solid ${({ theme }) => theme.colors.error?.default};
  color: ${({ theme }) => theme.colors.error?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

const Index = () => {
  const { error } = useMetaMaskContext();
  const { isFlask, snapsDetected, installedSnap } = useMetaMask();
  const requestSnap = useRequestSnap();
  const invokeSnap = useInvokeSnap();

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? isFlask
    : snapsDetected;

  const handleSendHelloClick = async () => {
    // console.log(await invokeSnap({ method: 'getAddresses', params: { address: "0x063b0881bcA7D9F0097D5f6300cE765EDc57E3f2" }}));
    console.log(await invokeSnap({ method: 'newAccount' }));
    const params = {
      ring: [
        '16d7da70ba247a6a40bb310187e8789b80c45fa6dc0061abb8ced49cbe7f887fde4c8b69b71006d02a4bd4f12fb5917a6861f0f86d606ee951754edbaac9ae4b',
        '21869ca3ae33be3a7327e9a0272203afa72c52a5460ceb9f4a50930531bd926a2c9535b5f71409cf334b639de2d39074ea35c3057857e32ca5487f5d3c68d982',
        '337d6f577e66a21a7831c087c6836a1bae37086bf431400811ac7c6e96c8ccbb71e0a8d9db6a9093bba7a47a38dce7e3a6df8a531d1b52cd564f512fce2a0132',
        '36c8ae45992ef5797f42be4748797b966e3be0a4827fb7d0b278444cb9c06b5eb2a34b714f4ce5905c4bec92a4ab3e764226e05acb6b9a3509e5677a19046ec6',
        '428e020f184b70ca931a91085ac1c233827a41d8516a4b6455e221e637c4de0f732a3d83f31b7fa512cda0ccd72e747559066d005f9f9d1660f238d1b346ae85',
        '438fbf3776cc24e2535822544f14d7b057d8957c726760180052cda7b8ba6c83678be57a16f69979248530cc00c357af31e2c89e62c18a2f562174b9976d6e5f',
        '50c1bd64c3087f65f481717ee4a5bdfbba4f060314993f1e15c0db29748b8dc221300f258285169c801c3a977fbb303ccac4a0a8513f166878bd229f8c9b658f',
        '5b3ab87693201b09da3a89938d0c523624d60562b191eca2b165c7a525e8af76b903237ebdd208284611977388af1a16514f205cfef23ac3cad79a4c2ec79173',
        '9f88210fdff108c83402e4bb771834474a36ce2529a41402f814ba9958a8e630e9b85f9aa30536be9e9f30559b9c543c45b7b54f1a18143c2b89aa70ee05195d',
        'cf5645720c7964a860284750c74d923180af03106635dfd578acc8ca7a573b1783593c3629c6efd6ca7eb844dd6de8045df97fa8b2a4172d004a26cb89e0ff21',
        'de4ec71b5b3195275edb4aa9c30e2e8ed367b6c5cfdfce0a1f33003827b5ac471a604ec8de433e6036683145cd27f64a8a9a34983d4531f632561dab06494369'
      ],
      claim_contract_address: "0x063b0881bcA7D9F0097D5f6300cE765EDc57E3f2",
      addressToUse: "0x063b0881bcA7D9F0097D5f6300cE765EDc57E3f2"
    } satisfies { ring: string[], claim_contract_address: string, addressToUse: string};
    console.log(await invokeSnap({ method: 'LSAG_signature', params: params }));
  };

  return (
    <Container>
      <Heading>
        Welcome to <Span>template-snap</Span>
      </Heading>
      <Subtitle>
        Get started by editing <code>src/index.ts</code>
      </Subtitle>
      <CardContainer>
        {error && (
          <ErrorMessage>
            <b>An error happened:</b> {error.message}
          </ErrorMessage>
        )}
        {!isMetaMaskReady && (
          <Card
            content={{
              title: 'Install',
              description:
                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
              button: <InstallFlaskButton />,
            }}
            fullWidth
          />
        )}
        {!installedSnap && (
          <Card
            content={{
              title: 'Connect',
              description:
                'Get started by connecting to and installing the example snap.',
              button: (
                <ConnectButton
                  onClick={requestSnap}
                  disabled={!isMetaMaskReady}
                />
              ),
            }}
            disabled={!isMetaMaskReady}
          />
        )}
        {shouldDisplayReconnectButton(installedSnap) && (
          <Card
            content={{
              title: 'Reconnect',
              description:
                'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
              button: (
                <ReconnectButton
                  onClick={requestSnap}
                  disabled={!installedSnap}
                />
              ),
            }}
            disabled={!installedSnap}
          />
        )}
        <Card
          content={{
            title: 'Send Hello message',
            description:
              'Display a custom message within a confirmation screen in MetaMask.',
            button: (
              <SendHelloButton
                onClick={handleSendHelloClick}
                disabled={!installedSnap}
              />
            ),
          }}
          disabled={!installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(installedSnap) &&
            !shouldDisplayReconnectButton(installedSnap)
          }
        />
        <Notice>
          <p>
            Please note that the <b>snap.manifest.json</b> and{' '}
            <b>package.json</b> must be located in the server root directory and
            the bundle must be hosted at the location specified by the location
            field.
          </p>
        </Notice>
      </CardContainer>
    </Container>
  );
};

export default Index;
