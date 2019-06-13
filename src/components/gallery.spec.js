import React from 'react';
import renderer from 'react-test-renderer';
import Gallery from './gallery';

describe('Gallery', () => {
  let data = {
    allImageSharp: {
      edges: [
        {
          node: {
            id: '4c60cf53-7cf4-5273-8ca3-a6ccede5eda7',
            fluid: {
              src:
                '/static/48a7f74887d89adc1004f2322a44745b/ea5de/sketch-1548788536.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: 'ae339d78-0cf8-5350-961a-f2ff1b709c0e',
            fluid: {
              src:
                '/static/aeee82d0dbdd8c189cc7d4f4ea2dca93/ea5de/sketch-1548787647.png',
              presentationWidth: 800,
              presentationHeight: 533,
            },
          },
        },
        {
          node: {
            id: '2630aae3-ecab-54d9-b2dd-b3cd922c984f',
            fluid: {
              src:
                '/static/d3deacac1c45c42ee3f23eb796a59b71/ea5de/sketch-1548787696.png',
              presentationWidth: 800,
              presentationHeight: 533,
            },
          },
        },
        {
          node: {
            id: '7be09838-ca0b-5a6a-bef1-37462053d89b',
            fluid: {
              src:
                '/static/9b6d24ddf5448bd0e483b4b209e733a1/ea5de/sketch-1548787785.png',
              presentationWidth: 800,
              presentationHeight: 533,
            },
          },
        },
        {
          node: {
            id: 'ac3cad82-9588-52ad-b571-fa6bd9296f51',
            fluid: {
              src:
                '/static/01e7459e1e0c7ce7b460158d37458df1/ea5de/sketch-1548594930.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: '3edbe859-7ce2-54d2-8d84-69febdd11ecc',
            fluid: {
              src:
                '/static/48e1e02bfe870e34c453ef709853c7d6/ea5de/sketch-1548621585.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: '2a3ad32d-4f1b-55ff-9421-726c02e8446f',
            fluid: {
              src:
                '/static/a7bbdf585302879e556de8f05ac30fcb/ea5de/sketch-2861.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: '4b674de4-2685-5c95-abe0-a0aa5baaceca',
            fluid: {
              src:
                '/static/115a6c0e2107c00e5d78f3b8ee460843/ea5de/sketch-1549911007.png',
              presentationWidth: 800,
              presentationHeight: 1400,
            },
          },
        },
        {
          node: {
            id: '91ea51b9-d03e-5713-91d1-6c34f1983b50',
            fluid: {
              src:
                '/static/014a95ab2ce9ceeb754d7aca38d5ba4b/ea5de/sketch-1548170002.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: '162799aa-421b-5870-a6c5-e8a31c9edd9f',
            fluid: {
              src:
                '/static/fe2c24fad55dd27c764d6d8d9a8472f0/ea5de/sketch-1548787814.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: '0c3578ab-994a-5f38-89d4-66cd638fe29c',
            fluid: {
              src:
                '/static/33292aa4c72487e42430e2960e4a99cf/ea5de/sketch-1548787909.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: 'af4a27d1-6ba7-566d-995d-31a3a2bcbc33',
            fluid: {
              src:
                '/static/a7f774fce6588d44dbee14e9b54d7038/ea5de/sketch-1548787939.png',
              presentationWidth: 800,
              presentationHeight: 1300,
            },
          },
        },
        {
          node: {
            id: '4a13d21f-d1ac-54bd-bf3e-1cb0d4df5469',
            fluid: {
              src:
                '/static/42368fa40b0885421fd50fd433e945f0/ea5de/sketch-1549911041.png',
              presentationWidth: 800,
              presentationHeight: 1400,
            },
          },
        },
        {
          node: {
            id: 'aca2fdcc-7bdc-53cd-8e61-174383243606',
            fluid: {
              src:
                '/static/85ffc13d5f6276fa1cf2af13950f1c41/ea5de/sketch-1548170045.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: '0774f104-6b5f-53bf-a0de-c7b11365c20c',
            fluid: {
              src:
                '/static/0d87a4a6460f1e8c085f3626e0266949/ea5de/sketch-1548170048.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: 'e1550870-dfac-52b5-ab24-140bacd00d7b',
            fluid: {
              src:
                '/static/5a7a63237f5edeb2723f5a8ff447154b/ea5de/sketch-1548170041.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: 'b46e10e3-97db-55ef-9dac-3a12c4e1ae11',
            fluid: {
              src:
                '/static/496a6a491ca66e50399f6fbf10c94a8b/ea5de/sketch-1548170043.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: 'f3b4efab-e00b-5d58-87b2-64bf97aea1f2',
            fluid: {
              src:
                '/static/12717111f3a5c546cf73ebc6b028cfb9/ea5de/sketch-1548175517.png',
              presentationWidth: 800,
              presentationHeight: 1400,
            },
          },
        },
        {
          node: {
            id: 'deb1484e-8beb-5ebd-9192-78c72ca64f40',
            fluid: {
              src:
                '/static/4d6859c156b6762b683a505f82debef0/ea5de/sketch-1548170040.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: 'f9bf06db-ab70-56ac-8538-4c3d32db467f',
            fluid: {
              src:
                '/static/ed16506cef0f0ee7d79b5444ef0977cd/ea5de/sketch-1548169879.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: '5275077a-ee47-5705-908b-b95028c57cbf',
            fluid: {
              src:
                '/static/af68a7e1b10c03c0fbbd85e27bee6cc9/ea5de/sketch-1548787887.png',
              presentationWidth: 800,
              presentationHeight: 1300,
            },
          },
        },
        {
          node: {
            id: '7527ee9f-70c0-52b3-ad9f-9e54c20c9d5f',
            fluid: {
              src:
                '/static/272fc7e422e539e9a3524906ff0dfb53/ea5de/sketch-1548175530.png',
              presentationWidth: 800,
              presentationHeight: 1400,
            },
          },
        },
        {
          node: {
            id: '8adbae63-af34-575c-8b62-e2c7972a9f4e',
            fluid: {
              src:
                '/static/325ddfc5eeeb6c38164fb5a8ab516cf4/ea5de/sketch-1548175627.png',
              presentationWidth: 800,
              presentationHeight: 1400,
            },
          },
        },
        {
          node: {
            id: 'd0606138-d84d-50ed-9496-d57d51bd8b32',
            fluid: {
              src:
                '/static/5586395ac350e78e756bc262e9cae4fb/ea5de/sketch-1548175652.png',
              presentationWidth: 800,
              presentationHeight: 1400,
            },
          },
        },
        {
          node: {
            id: '3741888a-d0b6-5833-b621-729b7e54301f',
            fluid: {
              src:
                '/static/e16823bbe357c6ca914ed5c588c7eeb6/ea5de/sketch-1548169882.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: 'bccecba0-8d1f-5231-a241-237334c64d16',
            fluid: {
              src:
                '/static/4d3a1fe971485b372b15df691a3f5fa8/ea5de/sketch-1548787782.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: '5b9b9bdd-4ad8-5987-ae25-99392cce1d5c',
            fluid: {
              src:
                '/static/a2e9732c61ef13c72689b33248940164/ea5de/sketch-1548175776.png',
              presentationWidth: 800,
              presentationHeight: 1400,
            },
          },
        },
        {
          node: {
            id: '17174660-cba2-5261-8619-b9f7e42f26fe',
            fluid: {
              src:
                '/static/aa734e9b43f9f413d769f037700fdb5c/ea5de/sketch-1549911073.png',
              presentationWidth: 800,
              presentationHeight: 1400,
            },
          },
        },
        {
          node: {
            id: '7518242d-424d-5b27-9351-908e222d44d4',
            fluid: {
              src:
                '/static/a632ab1897befbaf97152e16c46f2346/ea5de/sketch-1548149269.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: 'd66a1fd6-b208-59d5-a756-2b2eb1e88feb',
            fluid: {
              src:
                '/static/c234d85d8787e215ac507a51c29b6895/ea5de/sketch-1548787976.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: '8ed92ff3-0598-564e-a6bb-152bad646c39',
            fluid: {
              src:
                '/static/14094f29249ef4a82ccac12077bf67d0/ea5de/sketch-1548149320.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: '3456d534-c55d-5d3d-855f-a13709eb1cbc',
            fluid: {
              src:
                '/static/449132c137ab275c6eddbbe58d8026be/ea5de/sketch-1548788141.png',
              presentationWidth: 800,
              presentationHeight: 514,
            },
          },
        },
        {
          node: {
            id: 'd977362d-0493-577e-b9d5-4d7d964f4913',
            fluid: {
              src:
                '/static/aea17801a5e21f6ca661ad6862bf76c9/ea5de/sketch-1549911213.png',
              presentationWidth: 800,
              presentationHeight: 1400,
            },
          },
        },
        {
          node: {
            id: '8c370cd3-6bc0-52c8-abc8-353e3a082c5a',
            fluid: {
              src:
                '/static/4f6d41667210927f7928a4b31796bb4b/ea5de/sketch-1548149209.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: 'd52193ae-4cb7-5575-b044-4643e4b62284',
            fluid: {
              src:
                '/static/cb3096ba3c8f0e307168f55d3b937a4b/ea5de/sketch-1548149357.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: 'a2f7b64b-37e2-542b-bf97-b305dfcc415d',
            fluid: {
              src:
                '/static/39c82ac2118412a492d4db67a670c12f/ea5de/sketch-1549235111.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: 'fb13e737-5a22-5166-9ac6-ebdac6c5867a',
            fluid: {
              src:
                '/static/6d3063066942446594651126e0358a57/ea5de/sketch-1548788001.png',
              presentationWidth: 800,
              presentationHeight: 514,
            },
          },
        },
        {
          node: {
            id: '414e60c5-2e75-5523-a58f-92e4da3f5f92',
            fluid: {
              src:
                '/static/7fd4c3e408ffc7790b7406bfa098c127/ea5de/sketch-1548149310.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: '7703738f-7e1f-5109-8ddd-45f3be2da0cf',
            fluid: {
              src:
                '/static/49e722f36c36beec7b539755af6dc346/ea5de/sketch-1549235136.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: 'ebcce864-58f0-5988-8fe3-809213c8a18f',
            fluid: {
              src:
                '/static/67915e28d4aed5222a6dc73d4c8700da/ea5de/sketch-1548788321.png',
              presentationWidth: 800,
              presentationHeight: 514,
            },
          },
        },
        {
          node: {
            id: '506d1b0f-5480-54d5-a07b-84da84fa90d6',
            fluid: {
              src:
                '/static/c39642c581573a42eea70778bede4281/ea5de/sketch-1548788314.png',
              presentationWidth: 800,
              presentationHeight: 514,
            },
          },
        },
        {
          node: {
            id: '4570569b-af41-52bd-9b5f-ddcb5db0fda4',
            fluid: {
              src:
                '/static/289c749c3c7842f9f675e574d8e9b4c5/ea5de/sketch-1549911045.png',
              presentationWidth: 800,
              presentationHeight: 1400,
            },
          },
        },
        {
          node: {
            id: '9cd24d8c-04fd-5381-94c0-4d7d4a0e6d2a',
            fluid: {
              src:
                '/static/c3d0afa847be7746b5f845bb840f4c4b/ea5de/sketch-1548149330.png',
              presentationWidth: 800,
              presentationHeight: 800,
            },
          },
        },
        {
          node: {
            id: '0321ee34-253c-585e-89b5-aa0c492e83ef',
            fluid: {
              src:
                '/static/0da400f201259455a1eebba105f3ccb5/ea5de/sketch-1548788070.png',
              presentationWidth: 800,
              presentationHeight: 514,
            },
          },
        },
      ],
    },
  };

  let images = data.allImageSharp.edges.map(e => {
    return {
      src: e.node.fluid.src,
      width: e.node.fluid.presentationWidth,
      height: e.node.fluid.presentationHeight,
    };
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Gallery images={images} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
