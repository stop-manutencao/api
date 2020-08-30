const keystone = require('keystone')
const {
  eachSeries,
  eachOfSeries
} = require('async')
const { flatten } = require('underscore')
const Category = keystone.list('Category').model
const Alternative = keystone.list('Alternative').model

exports = module.exports = done => {
  const categories = Object.keys(data)
  eachSeries(categories, (category, callback) => {
    const alternatives = data[category]
    const letters = flatten(alternatives.map(Object.keys))

    eachOfSeries(letters, (letter, index, cb) => {
      const answers = data[category][index]
      const categoryToSave = new Category({ name: category, letter: letter })

      for (let answer of answers[letter]) {
        const alternative = new Alternative({
          description: answer.description,
          isCorrect: answer.isCorrect,
          category: categoryToSave._id
        })

        categoryToSave.alternative.push(alternative._id)
        categoryToSave.save()
        alternative.save()
      }

      return cb()
    }, callback)
  }, done)
}

const data = {
  'País com Regime Político Democrático Pleno': [
    {
      'A': [
        {
          description: 'Australia',
          isCorrect: true
        },
        {
          description: 'Albania',
          isCorrect: false
        },
        {
          description: 'Armenia',
          isCorrect: false
        },
        {
          description: 'Algeria',
          isCorrect: false
        }]
    },
    {
      'C': [
        {
          description: 'Costa Rica',
          isCorrect: true
        },
        {
          description: 'Costa do Marfim',
          isCorrect: false
        },
        {
          description: 'Camboja',
          isCorrect: false
        },
        {
          description: 'Congo',
          isCorrect: false
        }
      ]
    },
    {
      'E': [
        {
          description: 'Espanha',
          isCorrect: true
        },
        {
          description: 'Egito',
          isCorrect: false
        },
        {
          description: 'Etiópia',
          isCorrect: false
        },
        {
          description: 'El Salvador',
          isCorrect: false
        }
      ]
    },
    {
      'L': [
        {
          description: 'Luxemburgo',
          isCorrect: true
        },
        {
          description: 'Libéria',
          isCorrect: false
        },
        {
          description: 'Líbano',
          isCorrect: false
        },
        {
          description: 'Letônia',
          isCorrect: false
        }
      ]
    },
    {
      'M': [
        {
          description: 'Malta',
          isCorrect: true
        },
        {
          description: 'Madagascar',
          isCorrect: false
        },
        {
          description: 'Marrocos',
          isCorrect: false
        },
        {
          description: 'Moçambique',
          isCorrect: false
        }
      ]
    },
    {
      'R': [
        {
          description: 'Reino Unido',
          isCorrect: true
        },
        {
          description: 'Ruanda',
          isCorrect: false
        },
        {
          description: 'Rússia',
          isCorrect: false
        },
        {
          description: 'República do Quirguistão',
          isCorrect: false
        }
      ]
    }
  ],
  'Princípio Fundamental da Constituição Brasileira': [
    {
      'A': [
        {
          description: 'Autodeterminação dos povos',
          isCorrect: true
        },
        {
          description: 'Autoridade pública',
          isCorrect: false
        },
        {
          description: 'Autodefesa',
          isCorrect: false
        },
        {
          description: 'Autonomia pessoal',
          isCorrect: false
        }
      ]
    },
    {
      'C': [
        {
          description: 'Cidadania',
          isCorrect: true
        },
        {
          description: 'Colaboração',
          isCorrect: false
        },
        {
          description: 'Coletivismo',
          isCorrect: false
        },
        {
          description: 'Celibato',
          isCorrect: false
        }
      ]
    },
    {
      'D': [
        {
          description: 'Dignidade da pessoa humana',
          isCorrect: true
        },
        {
          description: 'Domínio público',
          isCorrect: false
        },
        {
          description: 'Diversidade',
          isCorrect: false
        },
        {
          description: 'Democracia',
          isCorrect: false
        }
      ]
    },
    {
      'I': [
        {
          description: 'Independência nacional',
          isCorrect: true
        },
        {
          description: 'Individualidade',
          isCorrect: false
        },
        {
          description: 'Irmandade',
          isCorrect: false
        },
        {
          description: 'Impessoalidade',
          isCorrect: false
        }
      ]
    },
    {
      'L': [
        {
          description: 'Livre iniciativa',
          isCorrect: true
        },
        {
          description: 'Liberalismo',
          isCorrect: false
        },
        {
          description: 'Laicidade',
          isCorrect: false
        },
        {
          description: 'Legalidade',
          isCorrect: false
        }
      ]
    },
    {
      'T': [
        {
          description: 'Trabalho',
          isCorrect: true
        },
        {
          description: 'Tolerância',
          isCorrect: false
        },
        {
          description: 'Transversalidade',
          isCorrect: false
        },
        {
          description: 'Timocracia',
          isCorrect: false
        }
      ]
    },
    {
      'R': [
        {
          description: 'Repúdio ao Terrorismo e ao Racismo',
          isCorrect: true
        },
        {
          description: 'Razoabilidade',
          isCorrect: false
        },
        {
          description: 'Respeito',
          isCorrect: false
        },
        {
          description: 'Republicanismo',
          isCorrect: false
        }
      ]
    }
  ],
  'Direito Individual ou Coletivo da Constituição Brasileira': [
    {
      'A': [
        {
          description: 'Atividade Artística',
          isCorrect: true
        },
        {
          description: 'Atividade sexual',
          isCorrect: false
        },
        {
          description: 'Amar',
          isCorrect: false
        },
        {
          description: 'Abrigo público',
          isCorrect: false
        }
      ]
    },
    {
      'C': [
        {
          description: 'Criação de associações',
          isCorrect: true
        },
        {
          description: 'Cidadania',
          isCorrect: false
        },
        {
          description: 'Concessão de Asilo Político',
          isCorrect: false
        },
        {
          description: 'Cooperação entre os povos',
          isCorrect: false
        }
      ]
    },
    {
      'E': [
        {
          description: 'Expressão da Atividade Científica',
          isCorrect: true
        },
        {
          description: 'Educação',
          isCorrect: false
        },
        {
          description: 'Empresa, Constituição de',
          isCorrect: false
        },
        {
          description: 'Economicidade',
          isCorrect: false
        }
      ]
    },
    {
      'D': [
        {
          description: 'Dano material, indenização por',
          isCorrect: true
        },
        {
          description: 'Décimo Terceiro Salário',
          isCorrect: false
        },
        {
          description: 'Delação Premiada',
          isCorrect: false
        },
        {
          description: 'Discurso Público',
          isCorrect: false
        }
      ]
    },
    {
      'L': [
        {
          description: 'Livre manifestação do pensamento',
          isCorrect: true
        },
        {
          description: 'Liberdade sexual',
          isCorrect: false
        },
        {
          description: 'Lei, Acesso à',
          isCorrect: false
        },
        {
          description: 'Legítima Defesa',
          isCorrect: false
        }
      ]
    },
    {
      'M': [
        {
          description: 'Manifestação do Pensamento',
          isCorrect: true
        },
        {
          description: 'Manifestação de Afeto',
          isCorrect: false
        },
        {
          description: 'Merenda Escolar',
          isCorrect: false
        },
        {
          description: 'Marca, Registro de',
          isCorrect: false
        }
      ]
    },
    {
      'R': [
        {
          description: 'Resposta, Direito de ',
          isCorrect: true
        },
        {
          description: 'Radio Popular, Abrir uma',
          isCorrect: false
        },
        {
          description: 'Residência Urbana',
          isCorrect: false
        },
        {
          description: 'Resistência e Desobediência Civil',
          isCorrect: false
        }
      ]
    }
  ],
  'Competência dos Municípios segundo a CF de 1988': [
    {
      'A': [
        {
          description: 'Arrecadar tributos',
          isCorrect: true
        },
        {
          description: 'Assistir aos incapazes',
          isCorrect: false
        },
        {
          description: 'Assegurar moradia aos sem teto',
          isCorrect: false
        },
        {
          description: 'Auxiliar as associações de bairro na interlocução com moradores',
          isCorrect: false
        }
      ]
    },
    {
      'C': [
        {
          description: 'Criar, organizar e suprimir distritos',
          isCorrect: true
        },
        {
          description: 'Coordenar e organizar associações de bairro',
          isCorrect: false
        },
        {
          description: 'Controlar a reciclagem de lixo',
          isCorrect: false
        },
        {
          description: 'Construir viadutos e passarelas',
          isCorrect: false
        }
      ]
    },
    {
      'L': [
        {
          description: 'Legislar sobre assuntos de interesse local',
          isCorrect: true
        },
        {
          description: 'Legislar e regulamentar a atuação de postos de saúde',
          isCorrect: false
        },
        {
          description: 'Limpar as calçadas',
          isCorrect: false
        },
        {
          description: 'Licitar serviços de educação para o Ensino Médio',
          isCorrect: false
        }
      ]
    },
    {
      'M': [
        {
          description: 'Manter programas de educação infantil e de ensino fundamental',
          isCorrect: true
        },
        {
          description: 'Monitorar a qualidade da água potável',
          isCorrect: false
        },
        {
          description: 'Manter programas de prevenção ao uso de drogas',
          isCorrect: false
        },
        {
          description: 'Monitorar a qualidade das vias urbanas',
          isCorrect: false
        }
      ]
    }
  ],
  'Sigla de Órgão Público da União': [
    {
      'A': [
        {
          description: 'ANEEL',
          isCorrect: true
        },
        {
          description: 'ANSP',
          isCorrect: false
        },
        {
          description: 'ABRH',
          isCorrect: false
        },
        {
          description: 'APAE',
          isCorrect: false
        }
      ]
    },
    {
      'C': [
        {
          description: 'CNJ',
          isCorrect: true
        },
        {
          description: 'CCJ',
          isCorrect: false
        },
        {
          description: 'CNI',
          isCorrect: false
        },
        {
          description: 'CFM',
          isCorrect: false
        }
      ]
    },
    {
      'E': [
        {
          description: 'EMBRAPA',
          isCorrect: true
        },
        {
          description: 'EMBRATEL',
          isCorrect: false
        },
        {
          description: 'EPTC',
          isCorrect: false
        },
        {
          description: 'EAD',
          isCorrect: false
        }
      ]
    },
    {
      'D': [
        {
          description: 'DNIT',
          isCorrect: true
        },
        {
          description: 'DMAE',
          isCorrect: false
        },
        {
          description: 'DETRAN',
          isCorrect: false
        },
        {
          description: 'DER',
          isCorrect: false
        }
      ]
    },
    {
      'L': [
        {
          description: 'LNA',
          isCorrect: true
        },
        {
          description: 'LPM',
          isCorrect: false
        },
        {
          description: 'LTDA',
          isCorrect: false
        },
        {
          description: 'LP',
          isCorrect: false
        }
      ]
    },
    {
      'M': [
        {
          description: 'MPU',
          isCorrect: true
        },
        {
          description: 'MST',
          isCorrect: false
        },
        {
          description: 'MPRS',
          isCorrect: false
        },
        {
          description: 'MRV',
          isCorrect: false
        }
      ]
    }
  ]
}
