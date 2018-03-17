import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Publication} from "../../models/publication";
import {EditorialProvider} from "../editorial/editorial";
import {User} from "../../models/user";
import {PublicationCommentary} from "../../models/publication-commentary";
import {Editorial} from "../../models/editorial";


@Injectable()
export class PublicationProvider {

  private publications:Publication[]=[];
  constructor(public http: HttpClient, editorialProvider:EditorialProvider) {
        this.publications.push(
          new Publication(
            1,
            'Real volta a vencer, acaba com invencibilidade do PSG em Paris e vai às quartas',
            'O sonho europeu do PSG sucumbiu diante de um gigante. Sem Neymar, seu principal craque, o Paris recebeu o Real Madrid no Parque dos Príncipes na tarde desta terça-feira e perdeu por 2 a 1. No jogo de ida, os merengues venceram por 3 a 1 na Espanha. O time parisiense está fora da Liga dos Campeões. E, 51 jogos depois, perdeu em casa. Os espanhóis, por sua vez, seguem à busca do quarto título em cinco anos. E estão nas quartas de final pela oitava vez seguida. ',
            '2018-01-01 10:00',
            new User(1,'Danilo', 'Santana', 100,1),
            1,
            editorialProvider.get(1),
            1,
            1,
            1,
            'http://s2.glbimg.com/DML4FBgfNJ-AF0d1727X5l87j9A=/0x86:3500x2273/640x400/s.glbimg.com/es/ge/f/original/2018/03/06/2018-03-06t213231z_1496203657_rc1727da39d0_rtrmadp_3_soccer-champions-psg-mad.jpg',
            456,
            'Salvador',
            []
          ),

          new Publication(
            2,
            'Análise: Corinthians chega ao mata-mata com força defensiva recuperada',
            'Mesmo com várias mudanças no time, a vitória do Corinthians por 2 a 0 contra o Botafogo-SP, em Ribeirão Preto, manteve a solidez defensiva reconquistada a partir do momento que abandonou o 4-1-4-1 e passou a jogar com dois volantes, no 4-2-3-1 e, depois, no 4-2-4.',
            '2018-01-01 10:00',
            new User(1,'Danilo', 'Santana', 100,1),
            1,
            editorialProvider.get(1),
            1,
            1,
            1,
            'https://s2.glbimg.com/1kCYgsimDRIYys5eRHPQElXin_Y=/0x0:2000x1333/984x0/smart/filters:strip_icc()/s.glbimg.com/es/ge/f/original/2018/03/11/20180311173552223_2_0zkcBH1.jpg',
            4122,
            'Salvador',
            []
          ),

          new Publication(
            2,
            'Aprendizado com Simeone, proximidade a Lugano e respaldo no São Paulo: conheça mais sobre Diego Aguirre',
            'Esta é a resposta do novo técnico do São Paulo, Diego Aguirre, para a pergunta "um jogador?", em uma entrevista em formato ping pong publicada em seu site oficial.',
            '2018-01-01 10:00',
            new User(1,'Danilo', 'Santana', 100,1),
            1,
            editorialProvider.get(1),
            1,
            1,
            1,
            'https://s2.glbimg.com/UUoLjACvqX9WLsYL0zNLcC4v1DI=/0x0:597x432/984x0/smart/filters:strip_icc()/s.glbimg.com/es/ge/f/original/2018/03/11/sem_titulo_00p6Yqp.png',
            1336,
            'Salvador',
            []
          )
        );


    this.publications.push(
      new Publication(
        4,
        'Em meio a negociações para eleição, Temer recebe Meirelles e cúpula do governo',
        'O presidente Michel Temer se reuniu neste domingo (11), no Palácio do Jaburu, com o ministro da Fazenda, Henrique Meirelles (PSD), e também mandou chamar os ministros Moreira Franco (MDB) e Eliseu Padilha (MDB).',
        '2018-01-01 10:00',
        new User(1,'Danilo', 'Santana', 100,1),
        1,
        editorialProvider.get(2),
        1,
        1,
        1,
        'https://s2.glbimg.com/8hIm9iqU_mJD-xCuqmYcxQEKLH0=/0x0:3500x2144/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2017/T/i/OifzSrRhqTl52i7h7FBg/2017-08-10t194902z-515865645-rc1be4f645a0-rtrmadp-3-brazil-economy-budget.jpg',
        1236,
        'Salvador',
        []
      ),

      new Publication(
        5,
        'Congresso retoma nesta semana análise de projetos sobre segurança pública',
        'Após a aprovação de uma série de propostas sobre proteção das mulheres na semana passada, em razão do Dia Internacional da Mulher, o Congresso Nacional retoma nesta semana a análise de projetos na área de segurança pública.',
        '2018-01-01 10:00',
        new User(1,'Danilo', 'Santana', 100,1),
        1,
        editorialProvider.get(2),
        1,
        1,
        1,
        'https://gazetaguacuana.com.br/wp-content/uploads/2015/09/politica1-450x314.jpg',
        1456,
        'Salvador',
        []
      ),

      new Publication(
        6,
        'Lava Jato: MPF pede arquivamento de inquérito relacionado a Vaccari Neto sobre doação a campanha eleitoral no Acre\n',
        'O Ministério Público Federal (MPF) pediu o arquivamento de um inquérito da Operação Lava Jato relacionado ao ex-tesoureiro do Partido dos Trabalhadores (PT) João Vaccari Neto e que investigava o pagamento de R$ 300 mil ao governador do Acre, Tião Viana (PT).',
        '2018-01-01 10:00',
        new User(1,'Danilo', 'Santana', 100,1),
        1,
        editorialProvider.get(2),
        1,
        1,
        1,
        'https://s2.glbimg.com/Cyka9rL3qwBAlsFHM-_4ySX_Rc4=/0x0:600x364/984x0/smart/filters:strip_icc()/s.glbimg.com/jo/g1/f/original/2016/02/03/vaccari.png',
        1063,
        'Salvador',
        []
      )
    );

    this.publications.push(
      new Publication(
        7,
        'Cacau e sua infinidade de benefícios à saúde!',
        'Um alimento que é tradição na época de Páscoa é o chocolate, muito apreciado pelas pessoas. Eu, particularmente, sou fã! O chocolate tem como principal ingrediente o cacau, que é um fruto rico em compostos antioxidantes essenciais para o organismo, mas que também precisa ter muita cautela na hora de consumir.',
        '2018-01-01 10:00',
        new User(1,'Danilo', 'Santana', 100,1),
        1,
        editorialProvider.get(3),
        1,
        1,
        1,
        'https://www.saudedicas.com.br/wp-content/uploads/2016/11/beneficios-do-cacau-para-a-beleza-1-676x288.jpg',
        1256,
        'Salvador',
        []
      ),

      new Publication(
        8,
        'Ômega-3 faz diferença para sua saúde?',
        'O que é o ômega-3? Qual a diferença entre ômega-3 e ômega-6? Fazem bem para a sua saúde?\n' +
        '\n' +
        ' \n' +
        '\n' +
        'Buscar a vida saudável e com qualidade é desejo de quase todo mundo. Comer bem faz parte da fórmula mágica que nos proporciona aniversários felizes e despreocupados.\n' +
        '\n' +
        ' \n' +
        '\n' +
        'As gorduras fazem parte da nossa vida diária. Sabemos muita coisa sobre elas. Umas são do bem, outras são do mal, outras pululam do bem para o mal. Frituras devem ser evitadas, azeites e óleos vegetais podem ser consumidos e assim, com as informações científicas, vamos norteando – dentro do possível, claro – a nossa alimentação.',
        '2018-01-01 10:00',
        new User(1,'Danilo', 'Santana', 100,1),
        1,
        editorialProvider.get(3),
        1,
        1,
        1,
        'https://s.glbimg.com/jo/g1/f/original/blog/8213d15f-7ec0-47a8-91c5-91d057754ae0_capsule-1079838_1280.jpg',
        1589,
        'Salvador',
        []
      ),

      new Publication(
        9,
        'Praça da República, em Belém, recebe serviços de saúde gratuitos neste domingo',
        'A Praça da República, em Belém, recebe na manhã neste domingo (11) uma ação nacional com serviços gratuitos de saúde oferecidos por dentistas, oftalmologistas, oncologistas e nutricionistas durante toda a manhã. A expectativa é reunir cerca de mil pessoas durante o dia de atendimento',
        '2018-01-01 10:00',
        new User(1,'Danilo', 'Santana', 100,1),
        1,
        editorialProvider.get(3),
        1,
        1,
        1,
        'https://s2.glbimg.com/a3eS3P03p5UMXvfFwllXBjRynSM=/0x0:1700x1065/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2017/X/B/NyHNbUQtq1pHB6yMPSoQ/toni-mendes.jpg',
        1002,
        'Salvador',
        []
      )
    );

  }

  getAll():Publication[]{
    return this.publications;

  }

  get(id:number):Publication{
    let publication = this.publications.filter(pub=>pub.id===id)[0];
    if(typeof publication === 'undefined'){
      return null;
    }
    return publication;
  }

  getByEditorial(editorial:Editorial):Publication[]{
    let publications_filtered = this.publications.filter((publication)=>{
      return publication.editorial == editorial
    })
    return publications_filtered;
  }

}
