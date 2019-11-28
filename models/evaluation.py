import os
import sys

import numpy as np
import torch
from torchvision import transforms
from PIL import Image
from torch.autograd import Variable

from mnist import *

if __name__ == "__main__":
    weights_file = '/workspace/models/test_model.pth'
    image_source =  '/workspace/images/' + sys.argv[1]

    device = torch.device('cpu')
    model = Net()
    model.load_state_dict(torch.load(weights_file, map_location=device))

    transformation = transforms.Compose([transforms.ToTensor(),
                                         transforms.Normalize((0.1307,),
                                                              (0.3081,))])
    image = Image.open(image_source)
    image = image.resize((28, 28))
    image.save('/workspace/images/temp.png')
    image = transformation(image)[:1]

    data = Variable(image, volatile=True)
    data = data.unsqueeze(0)

    pred = model(data).argmax(dim=1)[0].item()
    print(pred)
