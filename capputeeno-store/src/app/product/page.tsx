"use client";

import BackButton from "@/components/BackButton";
import { DefaultPageLayout } from "@/components/DefaultPageLayout";
import ShoppingBag from "@/components/icons/shoppingBag";
import { useProduct } from "@/hooks/useProduct";
import { formatPrice } from "@/utils/formatPrice";
import styled from "styled-components";

interface ProductProps {}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  section {
    margin-top: 24px;
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 32px;

    img {
      max-width: 640px;
      width: 50%;
    }

    > div {
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      button {
        background: #115d8c;
        mix-blend-mode: multiply;
        border-radius: 4px;
        color: white;
        border: none;
        cursor: pointer;
        padding: 10px 0px;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        text-transform: uppercase;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
    }
  }
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  span {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: var(--text-dark-2);
  }

  h2 {
    font-weight: 300;
    font-size: 32px;
    line-height: 150%;
    color: var(--text-dark-2);
    margin-top: 12px;
  }

  span:nth-of-type(2) {
    font-weight: 600;
    font-size: 20px;
    color: var(--shapes-dark);
    margin-bottom: 24px;
  }

  p {
    font-weight: 400;
    font-size: 12px;
    color: var(--text-dark);
  }

  div {
    margin-top: 24px;

    h3 {
      text-transform: uppercase;
      color: var(--text-dark);
      font-weight: 500;
      font-size: 16px;
    }

    p {
      font-size: 14px;
    }
  }
`;

export default function Product({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { data } = useProduct(searchParams.id);

  const handleAddToCart = () => {
    let cartItems = localStorage.getItem("cart-items");
    if (cartItems) {
      let cartItemsArray = JSON.parse(cartItems);

      let existingProductIndex = cartItemsArray.findIndex(
        (item: { id: string }) => item.id === searchParams.id
      );

      if (existingProductIndex != -1) {
        cartItemsArray[existingProductIndex].quantity += 1;
      } else {
        cartItemsArray.push({ ...data, quantity: 1, id: searchParams.id });
      }

      localStorage.setItem("cart-items", JSON.stringify(cartItemsArray));
    } else {
      let newCart = [
        {
          ...data,
          id: searchParams.id,
          quantity: 1,
        },
      ];

      localStorage.setItem("cart-items", JSON.stringify(newCart));
    }
  };

  return (
    <DefaultPageLayout>
      <Container>
        <BackButton navigate="/"></BackButton>
        <section>
          <img src={data?.image_url} alt={data?.name} />
          <div>
            <ProductInfo>
              <span>{data?.category}</span>
              <h2>{data?.name}</h2>
              <span>{formatPrice(data?.price_in_cents ?? 0)}</span>
              <p>
                *Frete de R$40,00 para todo o Brasil. Grátis para compras acima
                de R$900,00.
              </p>
              <div>
                <h3>Descrição</h3>
                <p>{data?.description}</p>
              </div>
            </ProductInfo>
            <button onClick={handleAddToCart}>
              <ShoppingBag></ShoppingBag>
              Adicionar ao carrinho
            </button>
          </div>
        </section>
      </Container>
    </DefaultPageLayout>
  );
}
