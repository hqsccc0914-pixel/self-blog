# 湍流理论的发展历程：从经验规律到多尺度动力学

## 摘要

湍流是流体运动中广泛存在的一种复杂状态，表现为速度和压力随时间不规则变化、不同尺度的涡旋相互作用以及动量、热量和物质的强烈混合。从河流、飞机绕流到发动机燃烧和电子设备散热，湍流直接影响阻力、传热和能量损失。湍流理论的发展经历了从宏观实验规律、流动稳定性分析、统计理论，到现代数值模拟和多尺度结构研究的过程。其核心问题始终围绕三个方面：流动何时由层流转变为湍流，湍流中的能量如何在不同尺度间传递，以及如何在有限计算资源下预测复杂流动。本文按照历史发展顺序介绍湍流理论的主要思想、关键公式和代表性成果，并结合工程问题说明不同理论的适用范围与局限。

关键词： 湍流；雷诺数；雷诺平均；能量级联；Kolmogorov理论；湍流模型；直接数值模拟

## 1 引言：湍流为什么成为经典力学中的难题

流体运动可以由质量守恒、动量守恒和能量守恒等基本定律描述。对于不可压缩牛顿流体，流动的基本控制方程为

$$
\nabla\cdot\boldsymbol{u}=0 \tag{1}
$$

$$
\frac{\partial\boldsymbol{u}}{\partial t}+\boldsymbol{u}\cdot\nabla\boldsymbol{u}=-\frac{1}{\rho}\nabla p+\nu\nabla^2\boldsymbol{u}+\boldsymbol{f} \tag{2}
$$

式中，\(\boldsymbol{u}\) 为速度矢量，\(p\) 为压力，\(\rho\) 为密度，\(\nu=\mu/\rho\) 为运动黏度，\(\mu\) 为动力黏度，\(\boldsymbol{f}\) 为单位质量体积力。式（2）称为Navier–Stokes方程，其非线性对流项 \(\boldsymbol{u}\cdot\nabla\boldsymbol{u}\) 使不同空间位置和不同尺度的速度扰动发生耦合。

在层流中，流体运动通常具有较规则的空间结构，许多典型问题能够得到解析解或稳定的数值解。湍流则包含大量随时间变化的涡旋，涡旋之间不断拉伸、破碎和相互作用。即使边界条件保持不变，瞬时速度场也会发生复杂变化。湍流因此成为一个由确定性控制方程支配、但通常需要统计方法描述的动力学问题。

湍流理论的历史可以理解为人们逐步建立三种能力的过程：首先通过实验识别流动状态，其次通过数学分析解释扰动和能量传递，最后利用模型与计算方法预测工程中无法直接解析求解的复杂流动。

## 2 从黏性流动方程到雷诺实验：湍流研究的建立

### 2.1 Navier与Stokes建立黏性流动的数学基础

19世纪以前，Euler方程已经能够描述理想流体的运动，但它忽略了黏性对流动的影响。1822年，Claude-Louis Navier将分子相互作用产生的内摩擦纳入流体运动方程。此后，George Gabriel Stokes在1845年从连续介质力学角度建立了黏性应力与速度梯度之间的关系，形成了现代牛顿流体运动方程的基础。

这一阶段的贡献在于建立了统一的控制方程。后来的层流、湍流、边界层以及数值流体力学，均以这些守恒方程为出发点。湍流的困难来自方程本身的非线性以及复杂初始条件和边界条件，而非缺少基本运动定律。

节点文献： Stokes, G. G. (1845). On the Theories of the Internal Friction of Fluids in Motion, and of the Equilibrium and Motion of Elastic Solids. Transactions of the Cambridge Philosophical Society, 8, 287–319.

### 2.2 Reynolds实验揭示层流与湍流的转变

1883年，Osborne Reynolds通过著名的圆管染色实验研究流体运动。他向透明管道中的水流注入细小染色液流，在低流速时观察到清晰的直线状染色轨迹；随着流速增加，染色液流开始摆动、破碎并迅速扩散到整个管道截面。该实验直观展示了层流向湍流的转变，并确立了惯性力与黏性力相对大小的重要性。

这一关系用雷诺数表示：

$$
Re=\frac{\rho UL}{\mu}=\frac{UL}{\nu} \tag{3}
$$

其中，\(U\) 为特征速度，\(L\) 为特征长度。对于圆管流动，通常取平均流速和管径：

$$
Re_D=\frac{\rho U_mD}{\mu} \tag{4}
$$

雷诺数较小时，黏性作用能够有效抑制扰动；雷诺数增大后，惯性作用增强，流动更容易出现持续的复杂运动。圆管流动中常用 \(Re_D\approx2300\) 作为工程上的转捩参考值，但转捩受入口扰动、管道粗糙度和实验条件影响，不能将该数值理解为所有流动统一的临界值。

Reynolds的工作还使研究者认识到，流动状态可以通过无量纲参数进行比较。尺寸不同、速度不同的实验，只要满足适当的相似条件，就能够用于研究相同类型的流动机理。

节点文献： Reynolds, O. (1883). An Experimental Investigation of the Circumstances Which Determine Whether the Motion of Water Shall Be Direct or Sinuous, and of the Law of Resistance in Parallel Channels. Philosophical Transactions of the Royal Society of London, 174, 935–982.

### 2.3 Reynolds平均与封闭问题的出现

1895年，Reynolds进一步提出将湍流中的瞬时物理量分解为平均量和脉动量：

$$
u_i=\overline{u_i}+u_i^{\prime},\qquad p=\overline{p}+p^{\prime} \tag{5}
$$

其中，上横线表示平均值，撇号表示相对于平均值的脉动。将式（5）代入Navier–Stokes方程并进行平均，可得雷诺平均Navier–Stokes方程：

$$
\frac{\partial\overline{u_i}}{\partial t}+\overline{u_j}\frac{\partial\overline{u_i}}{\partial x_j}=-\frac{1}{\rho}\frac{\partial\overline{p}}{\partial x_i}+\nu\frac{\partial^2\overline{u_i}}{\partial x_j^2}-\frac{\partial\overline{u_i^{\prime}u_j^{\prime}}}{\partial x_j} \tag{6}
$$

式中采用Einstein求和约定，重复下标表示求和。与瞬时方程相比，平均方程中新增了雷诺应力项：

$$
\tau_{ij}^{R}=-\rho\overline{u_i^{\prime}u_j^{\prime}} \tag{7}
$$

它反映了湍流脉动引起的平均动量输运。例如，在二维剪切流中，\(-\rho\overline{u^{\prime}v^{\prime}}\) 表示速度脉动相关性对平均动量传递的贡献。

雷诺平均方法将瞬时复杂运动转化为平均流场预测问题，但同时引入了新的未知量。平均方程无法单独确定全部雷诺应力，需要建立额外的物理关系，这就是湍流封闭问题。此后的大量湍流模型都围绕这一问题发展。

节点文献： Reynolds, O. (1895). On the Dynamical Theory of Incompressible Viscous Fluids and the Determination of the Criterion. Philosophical Transactions of the Royal Society of London A, 186, 123–164.

## 3 边界层与早期湍流模型：从理论走向工程

### 3.1 Prandtl边界层理论

1904年，Ludwig Prandtl提出边界层理论，指出高雷诺数流动中，黏性效应可以集中在固体壁面附近的薄层内。边界层外部的流动可以近似采用无黏性模型描述，而壁面附近需要保留黏性作用。这一思想使复杂的流体运动问题能够分区域处理，也为研究摩擦阻力、流动分离和近壁湍流提供了基础。

对于二维稳态不可压缩边界层，简化方程可写为

$$
u\frac{\partial u}{\partial x}+v\frac{\partial u}{\partial y}=-\frac{1}{\rho}\frac{dp_e}{dx}+\nu\frac{\partial^2u}{\partial y^2} \tag{8}
$$

其中，\(p_e\) 为边界层外缘压力。该方程体现了边界层在流向与法向尺度上的差异。后续的湍流边界层理论则需要在此基础上考虑湍流动量输运。

节点文献： Prandtl, L. (1904). Über Flüssigkeitsbewegung bei sehr kleiner Reibung. Verhandlungen des III. Internationalen Mathematiker-Kongresses, Heidelberg, 484–491.

### 3.2 混合长度理论与湍流黏度

1925年，Prandtl提出混合长度理论，借鉴分子运动论的思想，用流体团在发生显著动量交换前的特征移动距离描述湍流混合。对于简单剪切流，湍流运动黏度可表示为

$$
\nu_t=l_m^2\left|\frac{d\overline{u}}{dy}\right| \tag{9}
$$

式中，\(l_m\) 为混合长度，\(\nu_t\) 为湍流运动黏度。相应的雷诺剪切应力近似为

$$
-\overline{u^{\prime}v^{\prime}}=\nu_t\frac{d\overline{u}}{dy} \tag{10}
$$

这一模型把未知的湍流动量输运与平均速度梯度联系起来，形成了涡黏性模型的早期形式。它对简单剪切流具有重要价值，但对复杂分离流动、强旋转流动和明显各向异性流动的描述受到限制。

在壁面附近，混合长度常取 \(l_m=\kappa y\)，结合近壁恒定剪切应力假设，可以得到对数速度分布：

$$
u^{+}=\frac{1}{\kappa}\ln y^{+}+B \tag{11}
$$

其中，

$$
u^{+}=\frac{\overline{u}}{u_{\tau}},\qquad y^{+}=\frac{yu_{\tau}}{\nu},\qquad u_{\tau}=\sqrt{\frac{\tau_w}{\rho}} \tag{12}
$$

\(\kappa\) 为von Kármán常数，通常取约0.4，\(B\) 为与壁面条件有关的常数。对数律成为湍流边界层研究和工程近壁处理的重要依据。

节点文献： Prandtl, L. (1925). Bericht über Untersuchungen zur ausgebildeten Turbulenz. Zeitschrift für angewandte Mathematik und Mechanik, 5, 136–139.

## 4 稳定性理论与转捩：解释湍流如何产生

Reynolds实验指出了转捩现象，但没有完整解释扰动如何增长并形成湍流。20世纪初，Rayleigh、Orr、Sommerfeld等研究者逐步建立了流动稳定性理论。其基本思路是将流动表示为基础流动与微小扰动之和，研究扰动是否随时间增长。

对于平行基础流 \(U(y)\)，可设二维扰动流函数具有如下形式：

$$
\psi^{\prime}(x,y,t)=\hat{\psi}(y)e^{i(\alpha x-\omega t)} \tag{13}
$$

其中，\(\alpha\) 为波数，\(\omega\) 为复频率。当采用上述时间因子时，若 \(\operatorname{Im}(\omega)>0\)，扰动幅值随时间增长。将扰动代入线性化Navier–Stokes方程，可以得到Orr–Sommerfeld方程，用于分析黏性平行流的线性稳定性。

1944年，Tollmien–Schlichting波在边界层中的实验观测为线性稳定性理论提供了重要验证。随后，研究者发现转捩过程还涉及扰动的非线性相互作用、三维结构以及有限幅值扰动触发的旁路转捩。圆管层流在经典线性稳定性分析中对无穷小扰动保持稳定，但实际实验仍能在有限雷诺数下发生转捩，说明线性失稳并不能覆盖全部转捩机制。

这一阶段的理论使人们能够区分扰动初始增长、非线性发展和充分湍流等不同阶段，对航空边界层控制、流动减阻以及转捩预测具有重要意义。

节点文献： Schubauer, G. B., & Skramstad, H. K. (1947). Laminar-Boundary-Layer Oscillations and Transition on a Flat Plate. Journal of Research of the National Bureau of Standards, 38, 251–292. 该论文系统报告了1940年代完成的边界层转捩实验。

## 5 Kolmogorov理论：湍流多尺度结构的建立

### 5.1 从单个涡旋转向能量级联

20世纪上半叶，Richardson提出湍流能量级联的物理图像：大尺度涡旋从平均流动中获得能量，随后通过非线性作用将能量传递给更小尺度的涡旋，最终在足够小的尺度上由黏性耗散转化为内能。这一思想为理解湍流内部的多尺度结构提供了基础。

1941年，Andrey Kolmogorov在高雷诺数、局部各向同性等假设下，建立了小尺度湍流的相似理论。其核心思想是，在远离大尺度能量输入和小尺度黏性耗散的惯性区间内，统计特征主要由尺度 \(l\) 和单位质量能量耗散率 \(\varepsilon\) 决定。

由量纲分析可得特征速度：

$$
u_l\sim(\varepsilon l)^{1/3} \tag{14}
$$

对应的涡旋周转时间为

$$
t_l\sim\frac{l}{u_l}\sim\varepsilon^{-1/3}l^{2/3} \tag{15}
$$

这表明小尺度涡旋具有更短的特征时间，湍流中的运动同时覆盖了宽广的空间和时间尺度。

### 5.2 Kolmogorov微尺度

在最小尺度附近，黏性作用与惯性作用达到同一量级。利用 \(\nu\) 和 \(\varepsilon\) 可构造Kolmogorov长度、时间和速度尺度：

$$
\eta=\left(\frac{\nu^3}{\varepsilon}\right)^{1/4} \tag{16}
$$

$$
\tau_{\eta}=\left(\frac{\nu}{\varepsilon}\right)^{1/2} \tag{17}
$$

$$
u_{\eta}=(\nu\varepsilon)^{1/4} \tag{18}
$$

这些尺度描述了高雷诺数湍流中最小耗散运动的典型量级。随着雷诺数增加，最大尺度与最小尺度之间的差距扩大，直接解析全部尺度所需的计算量急剧增加。

### 5.3 能谱的 −5/3 标度律

在惯性区间内，Kolmogorov理论给出了湍流能谱的标度关系：

$$
E(k)=C_K\varepsilon^{2/3}k^{-5/3} \tag{19}
$$

其中，\(k\) 为波数，\(E(k)\) 为一维波数意义下的能量谱密度，\(C_K\) 为与谱定义有关的无量纲常数。波数越大，对应的空间尺度越小。式（19）表明惯性区间中的能量分布遵循幂律关系，是湍流理论最具代表性的结果之一。

需要注意的是，\(-5/3\) 律适用于满足相应假设的惯性区间，不能直接用于所有湍流流动的全部波数范围。1941年理论之后，Kolmogorov又在1962年提出修正相似假设，以考虑小尺度间歇性对统计标度的影响。现代研究发现，高阶统计量会偏离简单的1941年标度关系，间歇性因此成为湍流研究的重要方向。

节点文献： Kolmogorov, A. N. (1941). The Local Structure of Turbulence in Incompressible Viscous Fluid for Very Large Reynolds Numbers. Doklady Akademii Nauk SSSR, 30, 301–305.

## 6 统计湍流理论与封闭模型的发展

### 6.1 湍动能方程

Kolmogorov理论解释了小尺度统计规律，工程计算仍需要预测具体流场中的平均速度、压力和湍流强度。湍动能定义为

$$
k=\frac{1}{2}\overline{u_i^{\prime}u_i^{\prime}} \tag{20}
$$

它表示单位质量湍流速度脉动所具有的平均动能。对于不可压缩流动，湍动能输运方程可概括为

$$
\frac{Dk}{Dt}=P_k-\varepsilon+\frac{\partial}{\partial x_j}\left[\nu\frac{\partial k}{\partial x_j}-\frac{1}{2}\overline{u_i^{\prime}u_i^{\prime}u_j^{\prime}}-\frac{1}{\rho}\overline{p^{\prime}u_j^{\prime}}\right] \tag{21}
$$

其中，\(P_k\) 为湍动能生成项，\(\varepsilon\) 为耗散率。生成项通常表示为

$$
P_k=-\overline{u_i^{\prime}u_j^{\prime}}\frac{\partial\overline{u_i}}{\partial x_j} \tag{22}
$$

该方程描述了平均流动向湍流输送能量、湍流能量在空间中输运以及黏性耗散的过程。由于其中仍包含三阶速度相关量和压力扩散项，封闭问题会继续出现，需要进一步建模。

### 6.2 两方程模型的兴起

20世纪60至70年代，随着计算机和计算流体力学的发展，湍流模型逐渐形成可用于工程计算的体系。Launder与Spalding等研究者推动了 \(k-\varepsilon\) 模型的发展，其基本形式为求解湍动能 \(k\) 和耗散率 \(\varepsilon\) 的输运方程，并通过

$$
\nu_t=C_{\mu}\frac{k^2}{\varepsilon} \tag{23}
$$

确定湍流运动黏度。该模型计算成本较低，对许多充分发展的剪切湍流具有较好的工程适用性，因此长期应用于管道、换热器、燃烧室和外部绕流计算。

另一类重要模型是 \(k-\omega\) 模型，其中 \(\omega\) 表示比耗散率，其湍流黏度关系通常具有

$$
\nu_t\sim\frac{k}{\omega} \tag{24}
$$

的形式。Wilcox对 \(k-\omega\) 模型进行了系统发展，Menter于1994年提出SST模型，将近壁区域的 \(k-\omega\) 形式与远离壁面的 \(k-\varepsilon\) 特性结合，并引入剪切应力输运限制。该模型在工程边界层和部分逆压梯度分离流动中得到广泛应用。

上述模型的共同基础是通过附加输运方程构造湍流特征速度和长度尺度。模型性能受壁面处理、流动分离、曲率、旋转、浮力和各向异性等因素影响，具体选型需要结合流动特征和验证数据。

节点文献： Launder, B. E., & Spalding, D. B. (1974). The Numerical Computation of Turbulent Flows. Computer Methods in Applied Mechanics and Engineering, 3, 269–289.

## 7 数值模拟的革命：DNS、LES与RANS

随着计算能力提升，湍流研究逐步从平均量预测进入瞬时涡旋结构的直接计算阶段。现代计算方法主要分为三类，其区别在于对湍流尺度的解析程度。

| 方法 | 解析范围 | 说明 |
| --- | --- | --- |
| DNS：直接数值模拟 | 解析从大尺度到耗散尺度的全部湍流运动 | 直接求解Navier–Stokes方程，不引入湍流封闭模型。能够获得完整的瞬时速度场，但网格和时间步长必须足够精细，计算成本极高。 |
| LES：大涡模拟 | 直接解析大尺度涡旋，模型描述小尺度运动 | 通过空间滤波区分可解析尺度和亚格子尺度。能够保留主要非定常结构，计算成本介于DNS与RANS之间。 |
| RANS：雷诺平均模拟 | 求解平均流场，使用湍流模型描述脉动效应 | 计算成本较低，适合大量工程设计与参数分析，但对复杂瞬时结构和强非定常流动的描述依赖模型能力。 |

### 7.1 直接数值模拟（DNS）

1972年，Orszag与Patterson完成了早期具有代表性的三维湍流直接数值模拟。DNS不对湍流尺度进行建模，而是在满足空间和时间分辨率要求的条件下直接求解控制方程，因此能够获得详细的瞬时速度、涡量和能量传递信息。

DNS的计算代价随雷诺数迅速上升。对于典型三维高雷诺数湍流，空间自由度常按约 \(Re_L^{9/4}\) 的量级增长，这一估算基于Kolmogorov尺度与大尺度之间的关系。实际计算量还取决于网格类型、边界层、时间积分以及流动几何。

DNS使研究者能够直接检验湍流理论、观察近壁涡结构、研究能量耗散与间歇性，并为湍流模型提供高精度数据库。1987年Kim、Moin和Moser发表的充分发展槽道湍流DNS研究，是近壁湍流数值研究的重要里程碑。

节点文献： Orszag, S. A., & Patterson, G. S. (1972). Numerical Simulation of Three-Dimensional Homogeneous Isotropic Turbulence. Physical Review Letters, 28, 76–79.

### 7.2 大涡模拟（LES）

1963年，Smagorinsky在大气环流数值研究中提出了早期亚格子尺度模型。1970年，Deardorff进一步将大涡模拟用于三维湍流流动。LES的基本思想是对速度场进行空间滤波：

$$
u_i=\widetilde{u_i}+u_i^{sgs} \tag{25}
$$

其中，\(\widetilde{u_i}\) 为滤波后的可解析速度，\(u_i^{sgs}\) 为亚格子尺度部分。滤波后的动量方程中出现亚格子应力：

$$
\tau_{ij}^{sgs}=\widetilde{u_i u_j}-\widetilde{u_i}\widetilde{u_j} \tag{26}
$$

Smagorinsky模型通过涡黏性假设描述亚格子应力的偏应力部分，其湍流黏度表示为

$$
\nu_{sgs}=(C_s\Delta)^2\sqrt{2\widetilde{S}_{ij}\widetilde{S}_{ij}} \tag{27}
$$

其中，\(C_s\) 为Smagorinsky常数，\(\Delta\) 为滤波尺度，\(\widetilde{S}_{ij}\) 为滤波速度场的应变率张量：

$$
\widetilde{S}_{ij}=\frac{1}{2}\left(\frac{\partial\widetilde{u_i}}{\partial x_j}+\frac{\partial\widetilde{u_j}}{\partial x_i}\right) \tag{28}
$$

LES保留了大尺度涡旋的非定常运动，因此能够研究涡脱落、剪切层发展、流动分离以及大尺度混合过程。其局限主要来自近壁区域的尺度要求。壁面附近存在很薄的黏性底层和复杂的湍流结构，如果直接解析这些结构，网格数量会随雷诺数快速增加。工程中因此发展了壁面模型LES，通过模型描述壁面附近未解析的运动，以降低计算成本。

1991年，Germano等提出动态亚格子尺度模型，利用不同滤波尺度之间的关系，在计算过程中确定模型系数。该方法减少了对固定经验常数的依赖，也推动了LES向复杂流动应用发展。

节点文献： Germano, M., Piomelli, U., Moin, P., & Cabot, W. H. (1991). A Dynamic Subgrid-Scale Eddy Viscosity Model. Physics of Fluids A, 3, 1760–1765.

### 7.3 混合RANS–LES方法

对于高雷诺数复杂工程结构，DNS所需的计算资源通常远超常规设计条件，LES在近壁区域也需要较高的网格分辨率。20世纪90年代以后，研究者开始发展混合RANS–LES方法，在不同流动区域采用不同的解析尺度。

1997年，Spalart等提出分离涡模拟（DES）的基本思想。在附着边界层中使用RANS模型，以较低成本处理近壁流动；在远离壁面的分离区域使用LES形式，解析主要的大尺度非定常涡旋。此后，DES发展出DDES、IDDES等形式，用于改善网格诱导分离、壁面模型切换以及复杂流动预测问题。

混合方法在飞机绕流、车辆空气动力学、涡轮机械和大型流动分离问题中具有重要应用价值，但其结果仍受网格、模型切换方式和入口湍流条件影响。RANS、LES和DNS之间也不存在对所有工程问题统一适用的优劣顺序，计算方法需要与研究目标和验证条件相匹配。

节点文献： Spalart, P. R., Jou, W.-H., Strelets, M., & Allmaras, S. R. (1997). Comments on the Feasibility of LES for Wings, and on a Hybrid RANS/LES Approach. Advances in DNS/LES, 1, 137–147.

## 8 从随机运动到相干结构：湍流认识的深化

### 8.1 湍流中的相干结构

早期统计理论主要关注速度脉动的均值、方差和相关函数。随着实验测量和流动可视化技术发展，研究者逐渐认识到，湍流中存在具有一定空间组织和时间持续性的结构。例如，近壁湍流中存在低速条带、准流向涡以及喷射和扫掠事件，剪切层中存在大尺度涡卷起、配对和破碎过程。

20世纪60至70年代，Kline等利用氢气泡可视化技术研究湍流边界层，揭示了近壁低速条带的爆发过程。1971年，Willmarth与Lu通过条件采样分析壁面湍流中的动量输运事件，进一步推动了相干结构研究。

这些发现说明，湍流虽然具有不规则性，但其瞬时运动仍包含可识别的动力学过程。相干结构研究将统计量与具体流动机制联系起来，使研究者能够解释壁面摩擦、动量交换和湍流生成的来源。

节点文献： Kline, S. J., Reynolds, W. C., Schraub, F. A., & Runstadler, P. W. (1967). The Structure of Turbulent Boundary Layers. Journal of Fluid Mechanics, 30, 741–773.

### 8.2 混沌理论与湍流转捩

20世纪70年代，动力系统理论为理解复杂流动提供了新的视角。Lorenz在1963年研究简化的大气对流方程时，发现确定性非线性系统可以对初始条件高度敏感。1971年，Ruelle与Takens提出了与湍流发生相关的动力系统理论，指出复杂非周期运动可以通过有限次数的分岔形成。

Lorenz系统是这一思想的经典示例：

$$
\frac{dx}{dt}=\sigma(y-x) \tag{29}
$$

$$
\frac{dy}{dt}=x(r-z)-y \tag{30}
$$

$$
\frac{dz}{dt}=xy-bz \tag{31}
$$

其中，\(\sigma\)、\(r\)、\(b\) 为模型参数。该系统由确定性常微分方程组成，却能够产生复杂的非周期运动。它说明非线性系统的长期行为可以对初始条件高度敏感。

混沌理论对湍流研究的意义在于揭示了确定性与长期不可预测性之间的关系。需要区分的是，低维混沌模型只能描述部分动力学特征，实际三维湍流还包含大量空间自由度、多尺度能量传递和黏性耗散，因此无法仅用少数变量完整描述。

节点文献： Lorenz, E. N. (1963). Deterministic Nonperiodic Flow. Journal of the Atmospheric Sciences, 20, 130–141.

## 9 现代湍流理论：间歇性、精确关系与多尺度相互作用

### 9.1 间歇性与1941年理论的修正

Kolmogorov的1941年理论建立了惯性区间的基本标度关系，但实际湍流中的能量耗散并非在空间中均匀分布。实验和DNS表明，强烈的速度梯度和耗散事件会集中出现在局部区域，形成明显的间歇性。这使得高阶速度结构函数偏离简单量纲分析给出的标度。

纵向速度结构函数定义为

$$
S_p(r)=\left\langle\left[\delta u_L(r)\right]^p\right\rangle \tag{32}
$$

其中，\(\delta u_L(r)\) 为沿两点连线方向的速度增量：

$$
\delta u_L(r)=\left[\boldsymbol{u}(\boldsymbol{x}+\boldsymbol{r})-\boldsymbol{u}(\boldsymbol{x})\right]\cdot\frac{\boldsymbol{r}}{r} \tag{33}
$$

对于绝对值结构函数，也常研究

$$
\left\langle|\delta u_L(r)|^p\right\rangle\sim r^{\zeta_p} \tag{34}
$$

在简单的K41标度下，\(\zeta_p=p/3\)。间歇性使高阶标度指数产生偏离。1994年，She与Lévêque提出了著名的间歇性标度模型，对三维充分发展湍流中的高阶结构函数给出了一种理论描述。

节点文献： She, Z.-S., & Lévêque, E. (1994). Universal Scaling Laws in Fully Developed Turbulence. Physical Review Letters, 72, 336–339.

### 9.2 Kolmogorov四分之五定律

在湍流理论中，除量纲分析得到的标度关系外，还存在由控制方程和统计假设推导出的精确关系。其中最著名的是Kolmogorov四分之五定律：

$$
\left\langle\left[\delta u_L(r)\right]^3\right\rangle=-\frac{4}{5}\varepsilon r \tag{35}
$$

该关系适用于高雷诺数、均匀各向同性湍流的惯性区间，并要求满足相应的统计平稳或局部平稳条件。它将三阶纵向速度结构函数与平均能量耗散率直接联系起来，反映了湍流能量向小尺度传递的方向和强度。

四分之五定律在湍流研究中具有特殊地位，因为它提供了能够通过实验和DNS检验的严格标度关系，也是理解能量级联的重要理论依据。

### 9.3 大尺度与小尺度的相互作用

现代湍流研究进一步关注不同尺度之间的耦合。经典能量级联描述了平均意义上的能量从大尺度向小尺度传递，但局部流动中还存在小尺度对大尺度的反馈、尺度间能量交换以及大尺度运动对近壁小尺度结构的调制。

在高雷诺数壁面湍流中，大尺度和超大尺度运动会影响近壁速度脉动的幅值与分布。研究者通过谱分析、条件平均、尺度分解和高分辨率实验研究这些相互作用，以解释雷诺数增加后壁面摩擦和湍流结构的变化。

这一方向使湍流理论从单一尺度的统计描述扩展到不同尺度之间的动力学联系，也为壁面模型、减阻控制和高雷诺数流动预测提供了依据。

## 10 数据驱动与物理约束模型的发展

进入21世纪后，计算能力、实验测量技术和机器学习方法的发展，使湍流研究能够利用更大规模的数据。数据驱动方法主要用于湍流模型修正、流场重建、降阶建模和流动控制等问题。

例如，在RANS模型中，可以利用DNS或高精度实验数据修正雷诺应力与平均速度梯度之间的关系。传统线性涡黏性模型通常采用

$$
a_{ij}=-2\nu_t\overline{S}_{ij} \tag{36}
$$

其中，\(a_{ij}\) 为雷诺应力的各向异性部分，\(\overline{S}_{ij}\) 为平均应变率张量。数据驱动模型可以引入更复杂的张量关系，以描述旋转、曲率和各向异性等效应。

2016年，Ling等提出张量基神经网络，将物理不变性约束纳入雷诺应力建模，成为机器学习湍流封闭研究的重要节点。此后，物理信息神经网络、神经算子和降阶模型等方法逐步进入流体力学研究，用于求解、预测或构造流动的低维表示。

数据驱动方法仍面临训练数据覆盖范围、跨雷诺数泛化、边界条件变化、守恒约束和数值稳定性等问题。对于工程计算，模型需要经过独立工况验证，并检查动量、质量和能量守恒要求。

节点文献： Ling, J., Kurzawski, A., & Templeton, J. (2016). Reynolds Averaged Turbulence Modelling Using Deep Neural Networks with Embedded Invariance. Journal of Fluid Mechanics, 807, 155–166.

## 11 湍流理论在工程传热中的应用

湍流理论的发展直接推动了工程流动与传热预测。对于单相管内流动，湍流增强壁面附近的动量和热量交换，使对流换热系数通常高于相同条件下的层流。工程上常用Nusselt数、Reynolds数和Prandtl数建立换热关联：

$$
Nu=\frac{hD_h}{\lambda} \tag{37}
$$

$$
Pr=\frac{\mu c_p}{\lambda} \tag{38}
$$

其中，\(h\) 为对流换热系数，\(D_h\) 为水力直径，\(\lambda\) 为流体导热系数，\(c_p\) 为定压比热容。

对于充分发展湍流管流，Gnielinski关联式是常用的工程换热关系之一：

$$
Nu=\frac{(f/8)(Re-1000)Pr}{1+12.7(f/8)^{1/2}(Pr^{2/3}-1)} \tag{39}
$$

其中，\(f\) 为Darcy摩擦因子。该式适用于其规定范围内的单相管内湍流，需要根据具体几何和工况判断是否满足适用条件。

在微通道和高热流密度冷却问题中，湍流理论同样具有基础作用，但微尺度流动不能仅根据常规管流经验判断。微通道的水力直径较小，在一定质量流量下雷诺数仍可能处于层流或过渡流范围。对于两相流动沸腾，还需要考虑汽液界面、相变潜热、气泡动力学、液膜蒸发以及流动不稳定性。单相湍流模型不能直接替代两相流动沸腾模型，相关计算需要结合界面模型、相变模型和实验验证。

节点文献： Gnielinski, V. (1976). New Equations for Heat and Mass Transfer in Turbulent Pipe and Channel Flow. International Chemical Engineering, 16, 359–368.

## 12 湍流理论发展时间轴

| 时间 | 节点 | 主要进展 |
| --- | --- | --- |
| 1822–1845 | Navier–Stokes方程 | 建立黏性流体运动的基本控制方程。 |
| 1883 | Reynolds圆管实验 | 揭示层流、转捩和湍流的实验规律。 |
| 1895 | 雷诺平均理论 | 提出平均与脉动分解，形成湍流封闭问题。 |
| 1904–1925 | Prandtl边界层与混合长度 | 建立近壁流动分析和早期工程湍流模型。 |
| 1941 | Kolmogorov相似理论 | 建立能量级联、微尺度和惯性区间标度。 |
| 1963–1971 | 混沌与相干结构研究 | 深化对非线性动力学和有组织涡运动的认识。 |
| 1970s | DNS、LES与两方程模型 | 数值模拟和工程湍流封闭方法快速发展。 |
| 1990s | 动态LES、SST、DES | 提高复杂流动预测能力并发展混合模拟方法。 |
| 2010s至今 | 高分辨率模拟与数据驱动 | 研究多尺度相互作用、模型修正和物理约束预测。 |

## 参考文献

1. Stokes, G. G. (1845). On the Theories of the Internal Friction of Fluids in Motion, and of the Equilibrium and Motion of Elastic Solids. Transactions of the Cambridge Philosophical Society, 8, 287–319.
2. Reynolds, O. (1883). An Experimental Investigation of the Circumstances Which Determine Whether the Motion of Water Shall Be Direct or Sinuous, and of the Law of Resistance in Parallel Channels. Philosophical Transactions of the Royal Society of London, 174, 935–982.
3. Reynolds, O. (1895). On the Dynamical Theory of Incompressible Viscous Fluids and the Determination of the Criterion. Philosophical Transactions of the Royal Society of London A, 186, 123–164.
4. Prandtl, L. (1904). Über Flüssigkeitsbewegung bei sehr kleiner Reibung. Verhandlungen des III. Internationalen Mathematiker-Kongresses, Heidelberg, 484–491.
5. Prandtl, L. (1925). Bericht über Untersuchungen zur ausgebildeten Turbulenz. Zeitschrift für angewandte Mathematik und Mechanik, 5, 136–139.
6. Kolmogorov, A. N. (1941). The Local Structure of Turbulence in Incompressible Viscous Fluid for Very Large Reynolds Numbers. Doklady Akademii Nauk SSSR, 30, 301–305.
7. Schubauer, G. B., & Skramstad, H. K. (1947). Laminar-Boundary-Layer Oscillations and Transition on a Flat Plate. Journal of Research of the National Bureau of Standards, 38, 251–292.
8. Smagorinsky, J. (1963). General Circulation Experiments with the Primitive Equations: I. The Basic Experiment. Monthly Weather Review, 91, 99–164.
9. Lorenz, E. N. (1963). Deterministic Nonperiodic Flow. Journal of the Atmospheric Sciences, 20, 130–141.
10. Kline, S. J., Reynolds, W. C., Schraub, F. A., & Runstadler, P. W. (1967). The Structure of Turbulent Boundary Layers. Journal of Fluid Mechanics, 30, 741–773.
11. Deardorff, J. W. (1970). A Numerical Study of Three-Dimensional Turbulent Channel Flow at Large Reynolds Numbers. Journal of Fluid Mechanics, 41, 453–480.
12. Orszag, S. A., & Patterson, G. S. (1972). Numerical Simulation of Three-Dimensional Homogeneous Isotropic Turbulence. Physical Review Letters, 28, 76–79.
13. Launder, B. E., & Spalding, D. B. (1974). The Numerical Computation of Turbulent Flows. Computer Methods in Applied Mechanics and Engineering, 3, 269–289.
14. Gnielinski, V. (1976). New Equations for Heat and Mass Transfer in Turbulent Pipe and Channel Flow. International Chemical Engineering, 16, 359–368.
15. Kim, J., Moin, P., & Moser, R. (1987). Turbulence Statistics in Fully Developed Channel Flow at Low Reynolds Number. Journal of Fluid Mechanics, 177, 133–166.
16. Germano, M., Piomelli, U., Moin, P., & Cabot, W. H. (1991). A Dynamic Subgrid-Scale Eddy Viscosity Model. Physics of Fluids A, 3, 1760–1765.
17. Menter, F. R. (1994). Two-Equation Eddy-Viscosity Turbulence Models for Engineering Applications. AIAA Journal, 32, 1598–1605.
18. She, Z.-S., & Lévêque, E. (1994). Universal Scaling Laws in Fully Developed Turbulence. Physical Review Letters, 72, 336–339.
19. Spalart, P. R., Jou, W.-H., Strelets, M., & Allmaras, S. R. (1997). Comments on the Feasibility of LES for Wings, and on a Hybrid RANS/LES Approach. Advances in DNS/LES, 1, 137–147.
20. Ling, J., Kurzawski, A., & Templeton, J. (2016). Reynolds Averaged Turbulence Modelling Using Deep Neural Networks with Embedded Invariance. Journal of Fluid Mechanics, 807, 155–166.
