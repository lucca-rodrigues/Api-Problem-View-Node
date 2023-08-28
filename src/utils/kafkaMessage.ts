export class KafkaMessages {
  public colaborationMessage(problem: string) {
    return `Convide alguém para colaborar neste desafio que esta sem novas visualizacaoes: ${problem}`;
  }

  public notificationFirstMessage(firstViewer: string, problem: string) {
    return `${firstViewer} visualizou o seu desafio: ${problem}`;
  }

  public notificationMessage(
    firstViewer: string,
    quantity: number,
    problem: string
  ) {
    return `${firstViewer} e mais ${quantity} pessoas visualizaram o seu desafio: ${problem}`;
  }
}
