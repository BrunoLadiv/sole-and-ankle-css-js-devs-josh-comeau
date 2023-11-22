import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          {variant === 'on-sale' && <OnSaleTag>Sale</OnSaleTag>}
          {variant === 'new-release' && <NewReleTag>Just Released</NewReleTag>}
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price variant={variant}>{formatPrice(price)}</Price>
        </Row>
        
        <Row>

          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}

        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`

`;

const ImageWrapper = styled.div`
  position: relative;
  max-width: 340px;
  max-height: 312px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 16px 16px 4px 4px;


`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${props => props.variant === 'on-sale' ? 'line-through' : 'none'};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const Tag = styled.div`
  color:white;
  position: absolute;
  top: 20px;
  right: -10px;
  padding: 7px;
  border-radius: 4px;
`

const OnSaleTag = styled(Tag)`
  background-color: #C5295D;
`
const NewReleTag = styled(Tag)`
  background-color: #6868D9;
`

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
