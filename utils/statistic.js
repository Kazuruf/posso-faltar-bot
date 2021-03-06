/*
  Função para verificar e informar ao aluno estatísticas sobre sua nota,
  para que o mesmo oriente-se quando for necessário

  Autores:
    Lucas Varlesse
    Felipe Menino
    Filipe Meneses
*/

/*
  Favoravel:
    - Notas boas
    - Presenças boas
  Desvaforavel:
    - Notas ruins
    - Presenças ruins
*/

var favor = 2;
var desfavor = 2;

// Calcula a média de presença do aluno no mês
function calcMeanPresence(data, name){

  var final = 0;
  for (var i in data){
    if (data[i].nome == name){
      let v1 = parseInt(data[i].maxAbsences);
      let v2 = parseInt(data[i].absences);
      v2 = v2 * 100;

      final = (v2 / v1) - 100;
    }
  }
  return '\n\nPorcentagem de presença: ' + Math.abs(final) + '%';
}

// Gera a probabilidade de reprovação
function calcProbabilidade(){
  /*
    prob = n de resultados favoraveis / total de resultados = prob
  */
  return Math.floor((favor / desfavor) * 100) + '';
}

// Verifica a situação de presença em uma matéria escolhida pelo usuário
function verifyEspec(name, data){

  var msg = '';
  for(var i in data){
    if(data[i].nome == name)
      msg = data[i].nome + '\n\n' + 'Quantidade de presenças: ' + data[i].presences +
      '\n\n' + 'Quantidade de faltas: ' + data[i].absences
  }
  return msg + '\n' + calcMeanPresence(data, name);
}

// Verifica a situação total do aluno
function verifyTotal(data){

  var good = 0, bad = 0, finall = '';
  var msg = '';

  for(var i in data){
    msg = msg.concat(data[i].nome + '\n\n' +'Quantidade de presenças: ' + data[i].presences + '\n\n' +
    'Quantidade de faltas: ' + data[i].absences + "\n\n" + "---------------------\n\n");
    if(parseInt(data[i].absences, 10) > parseInt(data[i].presences, 10))
      good++;
    else
      bad++;
  }

  if(good > bad)
    finall = 'Pelo que percebi, no geral você está bem. Parabéns 😁';
  else{
    desfavor += 1
    finall = 'Cuidado! A presença é importante e pelo que percebi você tem muitas faltas';
  }
  return [msg + '\n\n\n\n' + finall, good, bad];
}

// Verifica a situação do aluno com relação as faltas
function verifyAbsences(data){

  var msg = '';
  var good = 0;
  var nonFalta = 0;
  var choose = 0;

  for (let i in data){
    msg = "Matéria de " + data[i].nome + " (" + data[i].sigla + ")\n\n";

    if (parseInt(data[i].absences) > parseInt(data[i].maxAbsences))
      nonFalta += 1;

    else if ((parseInt(data[i].maxAbsences) - parseInt(data[i].absences)) < 3)
      nonFalta += 1;

    else if ((parseInt(data[i].maxAbsences) - parseInt(data[i].absences)) < 7)
      choose += 1;

    else
      good += 1;

    }
    if (nonFalta > good && nonFalta > choose)
      msg = "Cara...Vai para a faculdade, você está bem ruim de presença nas matérias de hoje 😱";
    else if (good > nonFalta && good > choose)
      msg = "Hey! Você pode faltar tranquilo!";
    else if (choose > nonFalta && choose > good)
      msg = "Assim, você até pode faltar, MAS, não conte com isso das próximas vezes";
    return msg;
}

module.exports = {
  calcMeanPresence,
  verifyAbsences,
  verifyTotal,
  verifyEspec,
  calcProbabilidade
}
