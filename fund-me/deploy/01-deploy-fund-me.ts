import { DeployFunction } from 'hardhat-deploy/dist/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import {
  developmentNetworkNames,
  networkConfig,
} from '../helper-hardhat-config';
import { network } from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const HARDHAT_CHAIN_ID = 31337;
  const { deployments, getNamedAccounts } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId ?? HARDHAT_CHAIN_ID;
  log('Deploying contract to chanId: ', chainId, '');
  let priceFeedAggregatorAddress;

  if (developmentNetworkNames.includes(network.name)) {
    const priceFeedAggregator = await get('MockV3Aggregator');
    priceFeedAggregatorAddress = priceFeedAggregator.address;
  } else {
    priceFeedAggregatorAddress = networkConfig[chainId].ethUsdPriceFeed;
  }

  await deploy('FundMe', {
    from: deployer,
    args: [priceFeedAggregatorAddress],
    log: true,
  });

  log('FundMe deployed!');
  log('#########################');
};

export default func;
func.tags = ['all'];