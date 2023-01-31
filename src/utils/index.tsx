import * as anchor from '@project-serum/anchor'
import { FLEXIN_PROGRAM_ID_VALUE, TOKEN_METADATA_PROGRAM_ID_VALUE } from './constants'

const truncateAddress = (address: string) =>
  `${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`

const formatUsername = (username: string | undefined) => {
  if (!username) return `@someone`
  if (username?.includes('@') && username.indexOf('@') === 0) return username
  else if (!username?.includes('@')) return `@${username}`
}

const formatAmount = (number: number) => {
  return new Intl.NumberFormat('en-EN').format(number)
}

const round = (num: number, fix = 3) => parseFloat(num.toFixed(fix))
const clamp = (num: number, min = -20, max = 20) => Math.min(Math.max(num, min), max)

const generateMetadata = (name: string, symbol: string, description: string, creator: string, image: string) => {
  return {
    name,
    symbol,
    description,
    seller_fee_basis_points: 0,
    external_url: 'https://sonha.space',
    background_color: '000000',
    attributes: [
      { trait_type: 'Background', value: 'Red' },
      { trait_type: 'Fur / Skin', value: 'Red / Blue' },
      { trait_type: 'Head', value: "Musketeer's Hat" },
      { trait_type: 'Mouth', value: 'Soda' },
      { trait_type: 'Teeth', value: 'No Traits' },
      { trait_type: 'Clothing', value: 'Black T-Shirt' },
      { trait_type: 'Eyewear', value: 'Shutter Shades' },
      { display_type: 'number', trait_type: 'generation', value: 1 },
      { display_type: 'number', trait_type: 'sequence', value: 236 },
    ],
    properties: {
      category: 'image',
      creators: [{ address: creator, share: 100 }],
      files: [{ uri: image, type: 'image/png' }],
    },
    image,
  }
}

const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(TOKEN_METADATA_PROGRAM_ID_VALUE)
const FLEXIN_PROGRAM_ID = new anchor.web3.PublicKey(FLEXIN_PROGRAM_ID_VALUE)

const getMetadata = async (mint: anchor.web3.PublicKey): Promise<anchor.web3.PublicKey> =>
  anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    TOKEN_METADATA_PROGRAM_ID,
  )[0]

const getMasterEdition = async (mint: anchor.web3.PublicKey): Promise<anchor.web3.PublicKey> =>
  anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer(), Buffer.from('edition')],
    TOKEN_METADATA_PROGRAM_ID,
  )[0]

export {
  truncateAddress,
  round,
  clamp,
  formatUsername,
  formatAmount,
  generateMetadata,
  getMetadata,
  getMasterEdition,
  TOKEN_METADATA_PROGRAM_ID,
  FLEXIN_PROGRAM_ID,
}
