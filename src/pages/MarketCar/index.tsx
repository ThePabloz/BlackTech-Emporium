'use client'
import React, { useState, useEffect, useRef } from 'react';

interface IProduto {
  id: number;
  titulo: string;
  preco: number;
  imagem: string;
}

interface IshoppingItem {
  produto: IProduto;
  quantidade: number;
}

const produtos: IProduto[] = [
  { id: 1, titulo: 'Smartphone', preco: 1200.00, imagem: 'https://d3ddx6b2p2pevg.cloudfront.net/Custom/Content/Products/11/49/1149970_smartphone-samsung-galaxy-s24-ultra-5g-512gb-cinza-tela-6-8-camera-200mp-12gb-ram_m1_638417959598142889.jpg' },
  { id: 2, titulo: 'Notebook', preco: 2800.00, imagem: 'https://fujiokadistribuidor.vteximg.com.br/arquivos/ids/387053-400-400/p_59385_alta_1.jpg?v=638583099864500000' },
  { id: 3, titulo: 'Fone de Ouvido', preco: 240.00, imagem: 'https://fotos.oceanob2b.com/High/050746.jpg?ims=400x' },
  { id: 4, titulo: 'Televisão', preco: 2000.00, imagem: 'https://d3ddx6b2p2pevg.cloudfront.net/Custom/Content/Products/11/69/1169613_android-tv-40-mysticmy-sg40105i-mp-_m4_638574350882864246.jpg' },
  { id: 5, titulo: 'Câmera Digital', preco: 1600.00, imagem: 'https://cdn.awsli.com.br/400x400/2030/2030825/produto/189632983/whatsapp-image-2024-03-28-at-16-11-22--1--bgt15sq4eo.jpeg' },
  { id: 6, titulo: 'Relógio Inteligente', preco: 640.00, imagem: 'https://http2.mlstatic.com/D_939389-MLU72699560887_112023-C.jpg' },
  { id: 7, titulo: 'Tablet', preco: 960.00, imagem: 'https://novolare.ipoomweb.com.br/img-produto/400/105032/1/tablet+multilaser+m10+nb389+10.1+4gb+128gb+4g+wi+fi+preto.jpg' },
  { id: 8, titulo: 'Projetor', preco: 1440.00, imagem: 'https://fujioka.vteximg.com.br/arquivos/ids/222520-1000-1000/p_57320_alta_1.png?v=638145071669170000' },
  { id: 9, titulo: 'Impressora', preco: 480.00, imagem: 'https://d296pbmv9m7g8v.cloudfront.net/Custom/Content/Products/10/71/1071507_impressora-multifuncional-hp-deskjet-ink-advantage-2874-wifi-jato-de-tinta-colorida-10010512_m8_638496381949537242.jpg' },
  { id: 10, titulo: 'Teclado Mecânico', preco: 280.00, imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNFTJQh4EPqnQP4L_rJ9LmAQ0ntlV9PfAlqA&s' },
];

const MarketCarPages = () => {
  const [shoppingCart, setShoppingCart] = useState<IshoppingItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const cartRef = useRef<HTMLDivElement>(null);

  const handleAddProduto = (id: number) => {
    const produto = produtos.find((produto) => produto.id === id);

    const itemExistente = shoppingCart.find((item) => item.produto.id === id);

    if (itemExistente) {
      const newShoppingCart = shoppingCart.map((item) =>
        item.produto.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );
      setShoppingCart(newShoppingCart);
    } else {
      const newShoppingCart = [
        ...shoppingCart,
        { produto: produto!, quantidade: 1 },
      ];
      setShoppingCart(newShoppingCart);
    }
  };

  const handleRemoveProduto = (id: number) => {
    const newShoppingCart = shoppingCart.filter(
      (item) => item.produto.id !== id
    );
    setShoppingCart(newShoppingCart);
  };

  const totalPreco = shoppingCart.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0
  );

  const handlePrint = () => {
    window.print();
  };

  const filteredProdutos = produtos.filter(produto =>
    produto.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOutsideClick = (e: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
      setIsCartOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const discountedTotal = shoppingCart.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0
  );

  return (
    <div style={{
      background: '#f4f4f4',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0 20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{
        background: '#ffffff',
        width: '100%',
        padding: '10px 20px',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{
          color: '#333',
          margin: 0,
          fontSize: '28px',
          fontWeight: 'bold',
        }}>
          BlackTech Emporium
        </h1>
        <nav style={{
          display: 'flex',
          gap: '15px',
          fontSize: '16px',
        }}>
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            style={{
              background: 'black',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '20px',
              position: 'relative',
              padding: '10px',
              borderRadius: '5px',
              transition: 'background 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'purple')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'black')}
          >
            🛒
            {shoppingCart.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#e50914',
                color: '#fff',
                borderRadius: '50%',
                padding: '4px 8px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {shoppingCart.length}
              </span>
            )}
          </button>
        </nav>
      </header>
      <main style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '20px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '600px',
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
          width: '100%',
        }}>
          {filteredProdutos.map((produto) => (
            <div key={produto.id} style={{
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              textAlign: 'center',
              padding: '15px',
              transition: 'transform 0.3s ease',
            }}>
              <img src={produto.imagem} alt={produto.titulo} style={{
                width: '100%',
                height: 'auto',
                borderBottom: '1px solid #eee',
              }} />
              <h2 style={{
                fontSize: '18px',
                margin: '10px 0',
                color: '#333',
              }}>
                {produto.titulo}
              </h2>
              <p style={{
                fontSize: '16px',
                margin: '10px 0',
                color: 'purple',
              }}>
                R${produto.preco.toFixed(2)}
              </p>
              <button
                onClick={() => handleAddProduto(produto.id)}
                style={{
                  background: 'purple',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '10px',
                  borderRadius: '5px',
                  fontSize: '16px',
                  transition: 'background 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#5a2d77')}
                onMouseOut={(e) => (e.currentTarget.style.background = 'purple')}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      </main>
      {isCartOpen && (
        <div ref={cartRef} style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          width: '300px',
          maxHeight: '80vh',
          overflowY: 'auto',
          zIndex: 1000,
        }}>
          <h2 style={{
            marginTop: 0,
            fontSize: '20px',
            color: '#333',
          }}>
            Carrinho de Compras
          </h2>
          {shoppingCart.length === 0 ? (
            <p style={{
              textAlign: 'center',
              color: '#999',
            }}>
              Seu carrinho está vazio.
            </p>
          ) : (
            <ul style={{
              listStyleType: 'none',
              padding: 0,
              margin: 0,
            }}>
              {shoppingCart.map((item) => (
                <li key={item.produto.id} style={{
                  borderBottom: '1px solid #eee',
                  padding: '10px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span>{item.produto.titulo}</span>
                  <span>
                    {item.quantidade} x R${item.produto.preco.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemoveProduto(item.produto.id)}
                    style={{
                      background: 'red',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      fontSize: '14px',
                      marginLeft: '10px',
                    }}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
          }}>
            <strong style={{
              fontSize: '18px',
              color: '#333',
            }}>
              Total:
            </strong>
            <span style={{
              fontSize: '18px',
              color: 'purple',
            }}>
              R${totalPreco.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handlePrint}
            style={{
              background: 'black',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '5px',
              fontSize: '16px',
              width: '100%',
              marginTop: '10px',
              transition: 'background 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'purple')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'black')}
          >
            Imprimir
          </button>
        </div>
      )}
    </div>
  );
};

export default MarketCarPages;
